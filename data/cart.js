export const cart =[];
export function addtocart(productId){
    let matchingItem;
    cart.forEach((item)=>{
        if(item.id === productId){
            matchingItem = item;
        }

    });
    if(matchingItem){
        matchingItem.quantity++;
    }else{
    cart.push({
        id: productId,
        quantity: 1
    })
    }
}
