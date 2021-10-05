const products = [
  {
    name: 'One',
    tag: 'one',
    url: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
    price: 1500,
    inCart: 0,
  },
  {
    name: 'Two',
    tag: 'two',
    url: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
    price: 2500,
    inCart: 0,
  },
  {
    name: 'Three',
    tag: 'three',
    url: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
    price: 3500,
    inCart: 0,
  },
  {
    name: 'Four',
    tag: 'four',
    url: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
    price: 4500,
    inCart: 0,
  },
  {
    name: 'Five',
    tag: 'five',
    url: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
    price: 5500,
    inCart: 0,
  },
  {
    name: 'Six',
    tag: 'six',
    url: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
    price: 6500,
    inCart: 0,
  },
  {
    name: 'Seven',
    tag: 'seven',
    url: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
    price: 7500,
    inCart: 0,
  },
  {
    name: 'Eight',
    tag: 'eight',
    url: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
    price: 8500,
    inCart: 0,
  },
  {
    name: 'Nine',
    tag: 'nine',
    url: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
    price: 9500,
    inCart: 0,
  },
  {
    name: 'Ten',
    tag: 'ten',
    url: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
    price: 10500,
    inCart: 0,
  },
  {
    name: 'Eleven',
    tag: 'eleven',
    url: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
    price: 11500,
    inCart: 0,
  },
  {
    name: 'Twelve',
    tag: 'twelve',
    url: 'https://agbd.s3.amazonaws.com/media/images/Macbook-Aidr--M1-d-1.jpg',
    price: 12500,
    inCart: 0,
  },
]

let text = ''
for (let i = 0; i < products.length; i++) {
  text +=
    "<div class='card me-2 mb-2' style='width: 6rem; height: 8rem;'><img src='" +
    products[i].url +
    "'class='card-img-top'><div class='card-body'><h8 class='card-title'>" +
    products[i].name.slice(0, 4) +
    '</h8></div></div>'
}
document.getElementById('products').innerHTML = text
let carts = document.querySelectorAll('.card')
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i])
    totalCost(products[i])
    displayCart()
  })
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem('cartNumbers')
  productNumbers = parseInt(productNumbers)
  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1)
  } else {
    localStorage.setItem('cartNumbers', 1)
  }
  setItems(product)
}

function setItems(product) {
  let cartItems = JSON.parse(localStorage.getItem('ProductsInCart'))

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      }
    }
    cartItems[product.tag].inCart += 1
  } else {
    product.inCart = 1
    cartItems = {
      [product.tag]: product,
    }
  }

  localStorage.setItem('ProductsInCart', JSON.stringify(cartItems))
}

function totalCost(product) {
  let cartCost = localStorage.getItem('totalCost')
  if (cartCost !== null) {
    cartCost = parseInt(cartCost)
    localStorage.setItem('totalCost', cartCost + product.price)
  } else {
    localStorage.setItem('totalCost', product.price)
  }
}

function displayCart() {
  let cartItems = JSON.parse(localStorage.getItem('ProductsInCart'))

  let cartCost = localStorage.getItem('totalCost')
  let productList = document.querySelector('.listProduct')
  if (cartItems && productList) {
    productList.innerHTML = ''
    Object.values(cartItems).map((item) => {
      productList.innerHTML += `<li  style="padding: 10px; list-style-type: none;" class="list" style="list-style-type:none;"><div style="  position: relative;
      display: inline-block;"><img style="width: 50px;height: 50px; border: 1px solid #eaeaea;" src='${item.url}'><span style="  position: absolute;
      top: -15px;
      right: -10px;
      padding: 5px 10px;
      border-radius: 50%;
      background: #4cb19a;
      color: white;">${item.inCart}</span></div><span id="name">${item.name}</span><span class='rmv' style="float:right;">BDT${item.price}<i class="fas fa-trash-alt mx-1"></i></span></li><hr>`
    })
    // deleteButtons()
  }
  productList.innerHTML += `<div >Discount<span style="float:right;" >BDT0.00</span></div><div>Subtotal  :<span style="float:right;" >BDT${cartCost}</span></div><div>Tax(0%):<span style="float:right;" >BDT0</span></div><div>Total<span style="float:right;" >BDT${cartCost}</span></div><button style="width: 100%; background-color: #7872B9; color: white;"
  class="btn"><span style="float: left;">PAY</span><span style="float: right;">BDT${cartCost}</span></button>`
}

// function deleteButtons() {
//   let deleteButtons = document.querySelectorAll('.rmv')
//   let productNumbers = localStorage.getItem('cartNumbers')
//   let cartCost = localStorage.getItem('totalCost')
//   let cartItems = localStorage.getItem('ProductsInCart')
//   cartItems = JSON.parse(cartItems)
//   let productName
//   console.log(cartItems)

//   for (let i = 0; i < deleteButtons.length; i++) {
//     deleteButtons[i].addEventListener('click', () => {
//       console.log(deleteButtons[i])
//       // // productName = deleteButtons[i].querySelector('.name').textContent
//       // // localStorage.setItem(
//       // //   'cartNumbers',
//       // //   productNumbers - cartItems[productName].inCart
//       // // )
//       // // localStorage.setItem(
//       // //   'totalCost',
//       // //   cartCost - cartItems[productName].price * cartItems[productName].inCart
//       // // )
//       // delete cartItems[productName]
//       // localStorage.setItem('ProductsInCart', JSON.stringify(cartItems))

//       // displayCart()
//     })
//   }
// }
displayCart()
