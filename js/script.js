$(document).ready(function() {
  // Definir objetos de productos con nombre, precio e ingredientes
  const productos = {
    "Desayuno Tipico": {
      precio: 5.50,
      ingredientes: "Huevos revueltos, Frijoles refritos, queso, rodajas de platano y pan"
    },
    "Tostadas Francesas": {
      precio: 4.50,
      ingredientes: "5 tostadas francesas, miel de maple, taza de cafe (gratis refil de cafe hasta las 11:00 AM)"
    },
    "Panqueques": {
      precio: 4.00,
      ingredientes: "Tres hotcakes doraditos con mantequilla suave y el dulce sabor de la miel de maple, incluye taza de cafe (gratis refil de cafe hasta las 11:00 AM) "
    },
    "Smokehouse Gourmet": {
      precio: 11.00,
      ingredientes: "Pan artesanal o blanco, aros de cebolla, queso cheddar blanco, tocino, cebolla caramelizada y aderezo especial, carne 100% de res y papas gajo"
    },
    "Salmón a la Parrilla": {
      precio: 17.50,
      ingredientes: " Salmón a la parilla acompañado de una deliciosa salsa de aguacate y vegetales"
    },
    "Lomito": {
      precio: 18,
      ingredientes: "10 oz de lomito acompañado de la salsa de la casa, vegetales salteados, pure de papa y tortillas"
    },
    "Ensalada César": {
      precio: 8,
      ingredientes: "Lechuga romana, aderezo César, queso parmesano, crutones, tomate"
    },
    "Ensalada Griega": {
      precio: 7.50,
      ingredientes: "Lechuga romana,Pepino, tomate, cebolla roja, aceitunas kalamata, queso feta, aderezo griego"
    },
    "Ensalada César con Pollo": {
      precio: 6.50,
      ingredientes: "Lechuga romana, aderezo César, queso parmesano, crutones, pechuga de pollo a la parrilla"
    },
    "Coca Cola": {
      precio: 1.25,
       ingredientes: "Coca-cola de 12oz"
    },
    "Limonada con hierbabuena": {
      precio: 2,
      ingredientes: "Limonada fresca con hierbabuena"
    },
    "Jugo de Naranja con Zanahoria": {
      precio: 2,
      ingredientes: "Jugo de naranja natural con zanahoria"
    },
    "Plato Infantil 1": {
      precio: 5.00,
      ingredientes: "Hamburguesa pequeña, papas pequeñas, jugo de manzana"
    },
    "Plato Infantil 2": {
      precio: 6.50,
      ingredientes: "8oz de Pechuga de pollo a la plancha, con ensalada de vegetales "
    },
    "Plato Infantil 3": {
      precio: 7.50,
      ingredientes: "8 oz de lomito a la parrilla acompañado de papas gajo y chirimol"
    }
  };

  var cart = [];

  // Función para mostrar los detalles del producto en el modal
  $(".view-details").click(function() {
    var nombre = $(this).data('nombre');
    var precio = $(this).data('precio');
    var detallesHTML = "<p>Producto: " + nombre + "</p><p>Precio: $" + precio + "</p>";
    $("#modalContent").html(detallesHTML);
    $("#addToCartBtn").attr('data-nombre', nombre); // Actualizando el atributo data-nombre
    $("#addToCartBtn").attr('data-precio', precio); // Actualizando el atributo data-precio
    $("#menuItemModal").modal('show');
  });

  // Función para agregar productos al carrito
  $("#addToCartBtn").click(function() {
    var nombre = $(this).attr('data-nombre'); // Obteniendo el nombre del producto del atributo data-nombre
    var precio = $(this).attr('data-precio'); // Obteniendo el precio del producto del atributo data-precio
    var cantidad = parseInt($("#cantidad").val()) || 1; // Obteniendo la cantidad del producto
    var item = {
      nombre: nombre,
      precio: precio,
      cantidad: cantidad
    };
    cart.push(item);
    updateCart();
    $("#menuItemModal").modal('hide');
  });

  // Función para actualizar la vista del carrito y el total a pagar
function updateCart() {
  var cartHTML = "<ul>";
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    var subtotal = cart[i].precio * cart[i].cantidad;
    total += subtotal;
    cartHTML += "<li>" + cart[i].nombre + " - $" + cart[i].precio + " - Cantidad: " + cart[i].cantidad  + " <button class='btn btn-sm btn-danger remove-item' data-index='" + i + "'>Quitar</button></li>";
    // Agregar separación entre los productos en el carrito
    cartHTML += "<br>";
  }
  cartHTML += "</ul>";
  $("#cartContent").html(cartHTML);
  $("#total").text("Total: $" + total.toFixed(2));
}

// Manejar el evento click para quitar productos del carrito
$("#cartContent").on("click", ".remove-item", function() {
  var index = $(this).data('index');
  cart.splice(index, 1);
  updateCart();
});
  // Mostrar detalles del platillo en el modal
  $("#menuContent").on("click", ".view-details", function() {
    const nombre = $(this).data("nombre");
    const precio = parseFloat($(this).data("precio"));
    const producto = productos[nombre];
    $("#modalContent").html(`
      <p>Nombre: ${nombre}</p>
      <p>Ingredientes: ${producto.ingredientes}</p>
      <p>Precio: $${precio}</p>
      <label for="cantidad">Cantidad:</label>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary btn-minus" type="button">-</button>
        </div>
        <input type="number" class="form-control" id="cantidad" value="1" min="1">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary btn-plus" type="button">+</button>
        </div>
      </div>
    `);
    $("#addToCartBtn").data("nombre", nombre);
    $("#addToCartBtn").data("precio", precio);
    $("#menuItemModal").modal("show");
  });

  // Manejar la cantidad en el modal
  $("#modalContent").on("click", ".btn-plus", function() {
    const cantidadInput = $("#cantidad");
    const cantidad = parseInt(cantidadInput.val());
    cantidadInput.val(cantidad + 1);
  });

  $("#modalContent").on("click", ".btn-minus", function() {
    const cantidadInput = $("#cantidad");
    const cantidad = parseInt(cantidadInput.val());
    if (cantidad > 1) {
      cantidadInput.val(cantidad - 1);
    }
  });
});

