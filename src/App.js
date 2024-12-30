import React, { useEffect, useState } from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { addItemToCart, incrementQuantity, decrementQuantity, removeItemFromCart, fetchProducts } from './component/CartSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);
  const { isLoading, isError, products, items } = useSelector((state) => state.cart);
  const [showCart, setShowCart] = useState(false);


  useEffect(() => {
    dispatch(fetchProducts()).catch((err) => {
      console.error('Error fetching products:', err);
    });
  }, [dispatch]);

  const showCartModal = () => {
    setShowCart((prev) => !prev)
  }

  const handleAddToCart = (item) => {
    dispatch(addItemToCart(item));
  }
  const handleRemove = (id) => {
    dispatch(removeItemFromCart(id));
  }

  if (isLoading) return <h2 className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] '>Kya dekh rha hai bay...</h2>
  if (isError) return <h2 className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>{isError}</h2>

  return (
    <div className='relative bg-gray-200'>
      <div className="flex justify-between p-4 max-w-7xl mx-auto relative">
        <div className='text-xl font-bold'>Krishna</div>
        <button onClick={showCartModal} className='cursor-pointer'>Cart ({items.length})</button>
      </div>
      {showCart && items.length > 0 &&(
        <div className='absolute top-14 right-10  shadow-md z-[50] py-4 bg-white rounded-md max-h-96 overflow-scroll overflow-x-auto'>
          {items.map((item) => (
            <>
              <div className='flex flex-col gap-4'>
                <div className='flex gap-2 m-4' key={item.id}>
                  <img src={item.image} alt="product" className='h-20' />
                  <div className='w-full'>
                    <div className='flex justify-between'>
                      <h2 className='p-2 font-semibold'>{item.title}</h2>
                      <span className='p-2 shadow-md w-10 h-10 rounded-full flex justify-center items-center' onClick={() => handleRemove(item)}>X</span>
                    </div>
                    <div className='flex justify-between'>
                      <div>
                        <button onClick={() => dispatch(decrementQuantity(item))} className='cursor-pointer'>-</button>
                        <span className='mx-4'>{item.quantity || 1}</span>
                        <button onClick={() => dispatch(incrementQuantity(item))} className='cursor-pointer'>+</button>
                      </div>
                      <div className='font-bold text-xl'>
                        ${item.quantity * item.price.toFixed(2) || item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))
          }
            <div className='text-xl font-bold text-end pr-4 mt-4 border-t border-black'>
              Total : ${items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0).toFixed(2)}
            </div>
        </div>
      )}
      {user && user.name}
      <div className='w-full flex justify-center flex-wrap'>
        {products && products.map((item) => (
          <div className='flex flex-col gap-4 p-4 m-2 w-40 relative' key={item.id}>
            <img src={item.image} alt="product" className='h-40' />
            <button className='bg-blue-500 text-white p-2'
              onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
