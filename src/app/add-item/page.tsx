import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Server Component that renders the form
function AddItemForm() {
  return (
    <form className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-gray mb-2">
          Product Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full px-4 py-3 bg-transparent border border-slate-gray/30 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold text-white placeholder:text-slate-gray/50"
          placeholder="Enter product name"
          required
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-slate-gray mb-2">
          Price
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          className="w-full px-4 py-3 bg-transparent border border-slate-gray/30 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold text-white placeholder:text-slate-gray/50"
          placeholder="Enter price"
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-slate-gray mb-2">
          Category
        </label>
        <select
          id="category"
          className="w-full px-4 py-3 bg-transparent border border-slate-gray/30 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold text-white"
          required
        >
          <option value="" className="bg-primary-black">Select category</option>
          <option value="evening-wear" className="bg-primary-black">Evening Wear</option>
          <option value="casual-luxury" className="bg-primary-black">Casual Luxury</option>
          <option value="outerwear" className="bg-primary-black">Outerwear</option>
          <option value="accessories" className="bg-primary-black">Accessories</option>
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-gray mb-2">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          className="w-full px-4 py-3 bg-transparent border border-slate-gray/30 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold text-white placeholder:text-slate-gray/50"
          placeholder="Enter product description"
        ></textarea>
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-slate-gray mb-2">
          Product Image
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-gray/30 border-dashed rounded-sm cursor-pointer hover:border-gold transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-slate-gray" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-slate-gray">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-slate-gray">PNG, JPG, JPEG (MAX. 5MB)</p>
            </div>
            <input id="image" type="file" className="hidden" accept="image/*" />
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gold text-primary-black font-medium rounded-sm hover:bg-[#b8972c] transition-colors duration-300"
      >
        Add Product
      </button>
    </form>
  );
}

export default async function AddItemPage() {
  // Check authentication at the page level
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token) {
    redirect('/login?redirect=/add-item');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-black to-[#121212] pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="glass glass-border rounded-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gold mb-2">Add New Item</h1>
              <p className="text-slate-gray">Add products to your collection</p>
            </div>

            <AddItemForm />
          </div>
        </div>
      </div>
    </div>
  );
}