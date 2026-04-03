function getQty(cart, productId) {
    var item = cart.find(function(i) { 
        return i.productId === productId; 
    });
    return item ? item.quantity : 0;
}

function getPrice(products, productId) {
    var product = products.find(function(p) { 
        return p.id === productId; 
    });
    return product ? product.price : 0;
}

var OFFERS = [
  {
    id: 'cheese-bogof',
    badge: 'BOGOF',
    description: 'Buy a block of cheese, get a second block free',
    calculate: function(cart, products) {
      var qty   = getQty(cart, 'cheese');
      var price = getPrice(products, 'cheese');
      return Math.floor(qty / 2) * price;
    },
  },
  {
    id: 'soup-bread-deal',
    badge: '½ PRICE',
    description: 'Buy a tin of soup, get a loaf of bread half price',
    calculate: function(cart, products) {
      var soupQty   = getQty(cart, 'soup');
      var breadQty  = getQty(cart, 'bread');
      var breadPrice = getPrice(products, 'bread');
      var eligible  = Math.min(soupQty, breadQty);
      return parseFloat((eligible * breadPrice * 0.5).toFixed(2));
    },
  },
  {
    id: 'butter-third-off',
    badge: '⅓ OFF',
    description: 'Get a third off all butter this week',
    calculate: function(cart, products) {
      var qty   = getQty(cart, 'butter');
      var price = getPrice(products, 'butter');
      return parseFloat((qty * price * (1 / 3)).toFixed(2));
    },
  },
];

function calculateBill(cart, products) {
    var subtotal = 0;
    cart.forEach(function(item) {
        var price = getPrice(products, item.productId);
        subtotal += price * item.quantity;
    });
    subtotal = parseFloat(subtotal.toFixed(2));

    var appliedOffers = [];
    var totalSavings  = 0;

    OFFERS.forEach(function(offer) {
        var saving = offer.calculate(cart, products);
        if (saving > 0) {
        appliedOffers.push({
            id: offer.id,
            badge: offer.badge,
            description: offer.description,
            saving: saving,
        });
        totalSavings += saving;
        }
    });
    totalSavings = parseFloat(totalSavings.toFixed(2));
    return {
        subtotal: subtotal,
        savings:  totalSavings,
        total:    parseFloat((subtotal - totalSavings).toFixed(2)),
        offers:   appliedOffers,
    };
}

module.exports = { calculateBill, OFFERS };