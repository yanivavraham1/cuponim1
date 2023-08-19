const coupons = [];

document.addEventListener("DOMContentLoaded", function () {
  // Load coupons from local storage if available
  const savedCoupons = JSON.parse(localStorage.getItem("coupons"));
  if (savedCoupons) {
    coupons.push(...savedCoupons);
  }

  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const couponDiv = this.closest(".coupon");
      const couponId = couponDiv.getAttribute("data-coupon-id");
      const storeName = couponDiv.getAttribute("data-store-name");
      const couponCode = couponDiv.getAttribute("data-coupon-code");
      const description = couponDiv.querySelector(".description").textContent;
      const restrictions = couponDiv.querySelector(".restrictions").textContent;
      console.log(
        storeName + " " + storeName + " " + description + " " + restrictions
      );
      const coupon = {
        couponId,
        couponCode,
        storeName,
        description,
        restrictions,
      };

      const existingCoupon = coupons.find(
        (coupon) => coupon.couponId === couponId
      );
      if (existingCoupon) {
        alert("Coupon already exists in cart!");
      } else {
        coupons.push(coupon);
        localStorage.setItem("coupons", JSON.stringify(coupons));
        alert("Coupon added to cart!");
      }

      const savedCoupons = JSON.parse(localStorage.getItem("coupons"));
      console.log(savedCoupons);
    });
  });
});

function clearCart() {
  localStorage.removeItem("coupons");
  coupons.length = 0; // Clear the coupons array
  alert("Cart has been cleared!");
}

function getCart() {
  const savedCoupons = JSON.parse(localStorage.getItem("coupons"));
  return savedCoupons;
}
