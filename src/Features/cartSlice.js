import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    orderType: "delivery",//pick-up||dine-in||in-car
    id:"",
    address:"",
    totalAmount:"",
    discount:"",
    taxes:""
}
const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addItem(state, action) {
            const item = action.payload.item;

            const name = item.children[0].children[0].textContent;
            const price = item.children[0].children[1].textContent;

            let check = true;
            // Check if the item already exists in the cart
            state.cart.forEach(cartItem => {
                if (name === cartItem.name) {
                    check = false;
                    cartItem.quan++;
                }
            });
            // If the item does not exist, add it to the cart
            if (check) {
                state.cart.unshift({
                    name: name,
                    price: price,
                    quan: 1
                });
            }
        },
        changeItemQuan(state, action) {
            const { item: itemName, operation } = action.payload;

            state.cart.forEach((cartItem, index) => {
                if (cartItem.name === itemName) {
                    if (operation === "-") {
                        if (cartItem.quan === 1) {
                            state.cart.splice(index, 1);
                        } else {
                            cartItem.quan--;
                        }
                    } else {
                        cartItem.quan++;
                    }
                }
            });
        },
        changeOrderType(state, action) {
            const orderTypes = {
                0: "delivery",
                1: "pick-up",
                2: "dine-in",
                3: "in-car"
            };
            
            state.orderType = orderTypes[action.payload] || "";
            
        },
        setAddress(state, action) {
            state.address = action.payload;
        },
        setInfo(state,action) {
            const {discount,taxes,totalAmount}=action.payload
            state.discount=discount
            state.taxes=taxes
            state.totalAmount=totalAmount
        },
        clearCart(state, action) {
            state.cart = []
            state.orderType="delivery",
            state.id="",
            state.address=""
        }
    }
})

export const { addItem, changeItemQuan, changeOrderType, clearCart,setAddress,setInfo } = cartSlice.actions

export default cartSlice.reducer