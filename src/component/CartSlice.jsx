import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    'fetchProducts',
    async (args, { rejectWithValue }) => {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            if (!response.ok) {
                throw new Error("Internal Error... 500");
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const CartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        isLoading: false,
        isError: null,
        // items: [

        //     {
        //         "id": 1,
        //         "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        //         "price": 109.95,
        //         "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        //         "category": "men's clothing",
        //         "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        //         "rating": {
        //             "rate": 3.9,
        //             "count": 120
        //         }
        //     },
        //     {
        //         "id": 2,
        //         "title": "Mens Casual Premium Slim Fit T-Shirts ",
        //         "price": 22.3,
        //         "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        //         "category": "men's clothing",
        //         "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        //         "rating": {
        //             "rate": 4.1,
        //             "count": 259
        //         }
        //     },
        // ],
        items: []
    },
    reducers: {
        addItemToCart: (state, action) => {
            const itemInCart = state.items.find(item => item.id === action.payload.id);
            if (itemInCart) {
                itemInCart.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;  
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;  
            } else if (item && item.quantity === 1) {
                state.items = state.items.filter(item => item.id !== action.payload.id);  
            }
        },
        removeItemFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
    }
})
export const { addItemToCart,incrementQuantity, decrementQuantity,  removeItemFromCart } = CartSlice.actions;

export default CartSlice.reducer;
