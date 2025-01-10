# E-Commerce Product Management App

This project is a responsive and feature-rich e-commerce web application built using React, Redux, and TailwindCSS. It provides functionalities for managing products, searching, sorting, adding to cart/wishlist, and more. The app is designed to deliver a seamless user experience with an aesthetically pleasing UI/UX.

## Features

### Core Functionalities
1. **Product Listing:**
   - Displays a grid of products with images, names, prices, and updated dates.
   - Responsive design ensures optimal viewing across devices.

2. **Search Functionality:**
   - Users can search for products by name.
   - Instant filtering of the product list based on the search term.

3. **Sort Feature:**
   - Sort products by price in ascending or descending order.
   - Enhances product browsing experience.

4. **Add to Cart / Wishlist:**
   - Add products to a cart with quantity selection and total cost calculation.
   - Add products to a wishlist that persists across page refreshes using `localStorage`.

5. **Delete and Update Products:**
   - Admin functionalities to delete or update products.

6. **Cart Functionality:**
   - Adjust product quantities in the cart.
   - Calculates total cost dynamically.

### UI/UX Enhancements
- **Hover Effects:** Interactive hover animations on product images.
- **Responsive Design:** Mobile-first design with optimized layouts for various screen sizes.
- **Sorting and Filtering Controls:** Easily accessible search and sorting tools.
- **Error and Loading States:** Clear visual indicators for loading and error states.

## Technologies Used
- **Frontend:** React, Redux, TailwindCSS
- **Icons:** Lucide React
- **State Management:** Redux for cart, wishlist, and product state.
- **Persistent Storage:** `localStorage` for wishlist data.
- **Notifications:** `react-hot-toast` for feedback messages.

## Folder Structure
- **components/**: Contains reusable UI components like `SearchBar`, `SortFeature`, and `Cart`.
- **features/**: Redux slices for products, cart, and wishlist.
- **pages/**: Main pages like `Home`.

## How It Works

### Wishlist
- Products added to the wishlist are stored in `localStorage` to ensure persistence across sessions.
- Wishlist state is synced with Redux for seamless UI updates.

### Cart
- Users can add products to the cart and adjust quantities.
- The total cost is recalculated dynamically based on selected quantities.

### Product Management
- Admins can update product details or delete products directly from the UI.
- Changes are reflected immediately across the application.

## Future Enhancements
1. **User Authentication:** Secure login and personalized user data.
2. **Pagination:** Improve performance for large product datasets.
3. **Product Categories:** Filter products by categories for better navigation.
4. **Real Backend Integration:** Replace mock data with APIs.

## Screenshots
Add screenshots showcasing the UI and functionality here.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---
