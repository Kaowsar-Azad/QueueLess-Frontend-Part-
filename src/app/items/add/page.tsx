"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { FiArrowLeft, FiPlus, FiClock, FiUsers, FiTag, FiImage, FiLink, FiUploadCloud } from "react-icons/fi";

export default function AddServicePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const [uploadType, setUploadType] = useState<"file" | "url">("file");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Hospital");
  const [startHour, setStartHour] = useState("09:00");
  const [endHour, setEndHour] = useState("17:00");
  const [maxTokens, setMaxTokens] = useState("50");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      return toast.error("Please login to create a service.");
    }
    if (!name || !description || !category || !startHour || !endHour || !maxTokens || !address || !contactNumber) {
      return toast.error("Please fill in all fields.");
    }

    setLoading(true);

    try {
      let finalImageUrls: string[] = [];
      
      // Handle Image Upload
      if (uploadType === "url" && imageUrls.length > 0) {
        finalImageUrls = imageUrls.filter(url => url.trim() !== "");
      } else if (uploadType === "file" && imageFiles.length > 0) {
        for (const file of imageFiles) {
          const formData = new FormData();
          formData.append("image", file);
          
          const imgbbRes = await fetch("https://api.imgbb.com/1/upload?key=6ade999151c8a66080ec4796ac5bfd8c", {
            method: "POST",
            body: formData
          });
          
          const imgbbData = await imgbbRes.json();
          
          if (imgbbData.success) {
            finalImageUrls.push(imgbbData.data.url);
          } else {
            throw new Error("Failed to upload image to ImgBB");
          }
        }
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/services`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          description,
          category,
          ownerId: session.user.id,
          ownerName: session.user.name,
          address,
          contactNumber,
          startHour,
          endHour,
          images: finalImageUrls,
          maxTokens: parseInt(maxTokens)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create service");
      }

      toast.success("Service successfully created!");
      router.push(`/dashboard/owner`);
    } catch (error: any) {
      toast.error(error.message || "Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-zinc-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard/owner" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-800 mb-6 transition-colors">
          <FiArrowLeft className="mr-2" /> Back to Dashboard
        </Link>

        <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm p-8">
          <div className="border-b border-zinc-100 pb-6 mb-8">
            <h1 className="text-3xl font-bold text-zinc-900">Start New Queue</h1>
            <p className="text-zinc-500 mt-1">Fill in the details to list a new hospital, bank, or shop queue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-zinc-800 mb-2">Service / Business Name</label>
              <input 
                type="text" 
                value={name || ""} 
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-zinc-900" 
                placeholder="e.g. Apollo Hospital General OPD, City Bank Branch A"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-800 mb-2">Description</label>
              <textarea 
                value={description || ""} 
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-zinc-900" 
                placeholder="Describe your service, location, or requirements for booking..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-zinc-800 mb-2">Full Address</label>
                <input 
                  type="text" 
                  value={address || ""} 
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-zinc-900" 
                  placeholder="e.g. Level 4, QueueLess Tower, Banani"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-800 mb-2">Contact Number</label>
                <input 
                  type="text" 
                  value={contactNumber || ""} 
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-zinc-900" 
                  placeholder="+880 1234-567890"
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-semibold text-zinc-800 mb-2">Service Image</label>
              
              <div className="flex bg-zinc-100 p-1 rounded-xl mb-4 max-w-sm">
                <button 
                  type="button" 
                  onClick={() => setUploadType("file")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg transition-colors ${uploadType === "file" ? "bg-white text-blue-600 shadow-sm" : "text-zinc-500 hover:text-zinc-700"}`}
                >
                  <FiUploadCloud /> Upload File
                </button>
                <button 
                  type="button" 
                  onClick={() => setUploadType("url")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg transition-colors ${uploadType === "url" ? "bg-white text-blue-600 shadow-sm" : "text-zinc-500 hover:text-zinc-700"}`}
                >
                  <FiLink /> Image URL
                </button>
              </div>

              {uploadType === "file" ? (
                <div key="file-upload-container" className="border-2 border-dashed border-zinc-300 rounded-xl p-6 text-center hover:bg-zinc-50 transition-colors">
                  <FiImage className="mx-auto text-3xl text-zinc-400 mb-2" />
                  <input 
                    key="file-input-element"
                    type="file" 
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        setImageFiles(Array.from(e.target.files));
                      }
                    }}
                    className="hidden" 
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer text-blue-600 font-semibold hover:text-blue-700">
                    {imageFiles.length > 0 ? `${imageFiles.length} file(s) selected` : "Click to browse and upload multiple files"}
                  </label>
                  {imageFiles.length === 0 && <p className="text-xs text-zinc-500 mt-1">PNG, JPG, GIF up to 32MB</p>}
                </div>
              ) : (
                <div key="url-upload-container" className="space-y-3">
                  {imageUrls.map((url, idx) => (
                    <div key={`url-input-${idx}`} className="flex gap-2 items-center">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiLink className="text-zinc-400" />
                        </div>
                        <input 
                          type="url" 
                          value={url || ""} 
                          onChange={(e) => {
                            const newUrls = [...imageUrls];
                            newUrls[idx] = e.target.value;
                            setImageUrls(newUrls);
                          }}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-zinc-900" 
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      {imageUrls.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setImageUrls(imageUrls.filter((_, i) => i !== idx))}
                          className="p-3 text-red-500 hover:text-red-700 font-semibold text-sm transition-colors shrink-0"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setImageUrls([...imageUrls, ""])}
                    className="inline-flex items-center text-xs bg-zinc-100 text-zinc-600 font-bold px-3 py-1.5 rounded-lg hover:bg-zinc-200 transition-colors"
                  >
                    + Add Another URL
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-zinc-800 mb-2">Category</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <FiTag />
                  </div>
                  <select 
                    value={category || ""} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-zinc-900 appearance-none"
                  >
                    <option value="Hospital">Hospital / Clinic</option>
                    <option value="Bank">Bank / Finance</option>
                    <option value="Saloon">Saloon / Beauty</option>
                    <option value="Govt Office">Government Office</option>
                    <option value="Other">Other Service</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-800 mb-2">Max Daily Tokens / Slots</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <FiUsers />
                  </div>
                  <input 
                    type="number" 
                    value={maxTokens || ""} 
                    onChange={(e) => setMaxTokens(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-zinc-900" 
                    placeholder="50"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-zinc-800 mb-2">Start Time</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <FiClock />
                  </div>
                  <input 
                    type="time" 
                    value={startHour || ""} 
                    onChange={(e) => setStartHour(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-zinc-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-800 mb-2">End Time</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <FiClock />
                  </div>
                  <input 
                    type="time" 
                    value={endHour || ""} 
                    onChange={(e) => setEndHour(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-zinc-900"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 disabled:opacity-50 mt-6"
            >
              <FiPlus /> {loading ? "Creating..." : "Create Service Queue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
