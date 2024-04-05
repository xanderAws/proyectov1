$(document).ready(function() {
  // Definir objetos de productos con nombre, precio e ingredientes
  const productos = {
    "Huevos Revueltos": {
      precio: 5,
      ingredientes: "Huevos, sal, pimienta, mantequilla"
    },
    "Tostadas Francesas": {
      precio: 6,
      ingredientes: "Pan, huevos, leche, canela, azúcar"
    },
    "Panqueques": {
      precio: 7,
      ingredientes: "Harina, huevos, leche, azúcar, sal"
    },
    "Smokehouse Gourmet": {
      precio: 10,
      ingredientes: "Pan de hamburguesa, carne de res, lechuga, tomate, cebolla, queso, salsa, condimentos"
    },
    "Salmón a la Parrilla": {
      precio: 15,
      ingredientes: "Salmón, limón, aceite de oliva, sal, pimienta"
    },
    "Filete de Ternera": {
      precio: 18,
      ingredientes: "Filete de ternera, sal, pimienta, aceite de oliva"
    },
    "Ensalada César": {
      precio: 8,
      ingredientes: "Lechuga romana, aderezo César, queso parmesano, crutones"
    },
    "Ensalada Griega": {
      precio: 9,
      ingredientes: "Pepino, tomate, cebolla roja, aceitunas kalamata, queso feta, aderezo griego"
    },
    "Ensalada César con Pollo": {
      precio: 10,
      ingredientes: "Lechuga romana, aderezo César, queso parmesano, crutones, pechuga de pollo a la parrilla"
    },
    "Coca Cola": {
      precio: 2,
      ingredientes: "Agua carbonatada, azúcar, colorante, ácido fosfórico, cafeína"
    },
    "Agua Mineral": {
      precio: 1,
      ingredientes: "Agua purificada"
    },
    "Jugo de Naranja": {
      precio: 3,
      ingredientes: "Jugo de naranja natural"
    }
  };

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

  // Agregar al carrito
  $("#addToCartBtn").on("click", function() {
    const nombre = $(this).data("nombre");
    const precio = $(this).data("precio");
    const cantidad = parseInt($("#cantidad").val());
    // Aquí puedes agregar la lógica para agregar el producto al carrito
    console.log(`Agregado al carrito: ${cantidad}x ${nombre} - $${precio * cantidad}`);
    $("#menuItemModal").modal("hide");
  });
});

