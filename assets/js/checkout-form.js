var product_data = [
	{
		title: 'GOP',
		description: 'This is good.',
		image_link: 'assets/img/1.jpg',
		price: 5,
		currency: '€',
		count: 0
	},
	{
		title: 'Toy Story',
		description: 'Powerful Item.',
		image_link: 'assets/img/2.jpg',
		price: 8,
		currency: '€',
		count: 0
	},
	{
		title: 'Bear',
		description: 'Surprise Item.',
		image_link: 'assets/img/3.jpg',
		price: 10,
		currency: '€',
		count: 0
	}
]

render();

function addProduct(evt) {
	var index = evt.target.getAttribute("index");	
	product_data[index].count = product_data[index].count + 1;
	document.getElementById('product-total' + index).innerHTML = product_data[index].count * product_data[index].price;
	document.getElementById('product-count' + index).value = product_data[index].count;
	renderTotalPrice();
	renderDiscount();		
}

function removeProduct(evt) {
	var index = evt.target.getAttribute("index");	
	product_data[index].count = product_data[index].count - 1 < 0? 0: product_data[index].count - 1;
	document.getElementById('product-total' + index).innerHTML = product_data[index].count * product_data[index].price;
	document.getElementById('product-count' + index).value = product_data[index].count;
	renderTotalPrice();
	renderDiscount();		
}

function countProduct(evt) {
	var index = evt.target.getAttribute("index");
	if(evt.target.value < 0) {
		product_data[index].count = 0;
	} else {
		product_data[index].count = evt.target.value;
	}
	document.getElementById('product-count' + index).value = product_data[index].count;
	document.getElementById('product-total' + index).innerHTML = product_data[index].count * product_data[index].price;
	renderTotalPrice();
	renderDiscount();
}

function renderTotalPrice() {
	var total_count = 0, total_price = 0;
	for(var product_index = 0; product_index < product_data.length; product_index ++) { 
		total_count = total_count + product_data[product_index].count;
		total_price = total_price + product_data[product_index].price * product_data[product_index].count;
	}
	document.getElementById('item-total-count').innerHTML = total_count;
	document.getElementById('item-total-price').innerHTML = total_price;
}

function renderDiscount() {
	var discount_list = [], total_price = 0;
	for(var product_index = 0; product_index < product_data.length; product_index ++) {
		if(product_data[product_index].count == 2) {
			discount_list.push({title: "2x1 " + product_data[product_index].title + " offer", value: product_data[product_index].price});
		} else if(product_data[product_index].count >= 3) {
			discount_list.push({title: "x" + product_data[product_index].count + " " + product_data[product_index].title + " offer", value: product_data[product_index].count})
		}

		total_price = total_price + product_data[product_index].price * product_data[product_index].count;
	}

	for(var discount_index = 0; discount_index < discount_list.length; discount_index ++) {
		if(discount_index == 0) {
			document.getElementById('discount-container').innerHTML = generateDiscountContent(discount_list[discount_index].title, discount_list[discount_index].value);
		} else {
			var element = document.createElement('div');
			element.innerHTML = generateDiscountContent(discount_list[discount_index].title, discount_list[discount_index].value);
			document.getElementById('discount-container').appendChild(element);
		}
		total_price = total_price - discount_list[discount_index].value;
	}

	document.getElementById('total-checkout-price').innerHTML = total_price;
}

function render() {
	for(var product_index = 0; product_index < product_data.length; product_index ++) {
		var element = document.createElement("div");
		element.innerHTML = generateContent(product_data[product_index], product_index);
		document.getElementById('products_content').appendChild(element);

		document.getElementById('product-count-add' + product_index).addEventListener('click', function (e) {
			addProduct(e);
		});
		document.getElementById('product-count-remove' + product_index).addEventListener('click', function(e) {
			removeProduct(e)
		});
		document.getElementById('product-count' + product_index).addEventListener('input', function(e) {
			countProduct(e)
		});
	}

	renderTotalPrice();	
}

function generateContent(infor, index) {
	return `<div class="table-container">
	<div class="item-product">
		<div class="image-container" style="background-image: url(${infor.image_link});">
			</div>
		<div class="content-container">
			<h5>${infor.title}</h5>
			<p>${infor.description}</p>
		</div>
	</div>
	<div class="item-quality">
		<i class="fa fa-plus" index=${index} id=${'product-count-add' + index}></i>
		<input type="number" index=${index} value=${infor.count} id=${'product-count' + index} />
		<i class="fa fa-minus" index=${index} id=${'product-count-remove' + index}></i>
	</div>
	<div class="item-price">
		<span class="">${infor.price}</span>
		<span class="currency">${infor.currency}</span>
	</div>
	<div class="item-total">
		<span class="" id=${'product-total' + index}>${infor.count * infor.price}</span>
		<span class="currency">${infor.currency}</span>
	</div>
</div>`	
}

function generateDiscountContent(title, value) {
	return `<div class="product-discount-container">
		<span class="discount-title">${title}</span>
		<span class="discount-value">${"-" + value + ' €'}</span>
	</div>`
}