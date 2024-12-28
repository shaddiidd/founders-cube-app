import AsyncStorage from "@react-native-async-storage/async-storage";
import Purchases from "react-native-purchases";

class PurchaseManager {
  async createOrder(userId, productId) {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://172.20.10.2:5001/founders-cube-87aa6/us-central1/api/sales/createAppleOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, productId }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error);
      }
      return data.orderId;
    } catch (error) {
      console.error('Create Order Error:', error);
      throw error;
    }
  }

  async validatePurchase(orderId, receipt) {
    try {
      const response = await fetch('http://172.20.10.2:5001/founders-cube-87aa6/us-central1/api/sales/validateApplePurchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, receipt }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error);
      }
      return data.data;
    } catch (error) {
      console.error('Validation Error:', error);
      throw error;
    }
  }

  async handlePurchase(userId, productId) {
    try {
      // 1. Create order in backend
      const orderId = await this.createOrder(userId, productId);

      // 2. Request purchase from Apple
      Purchases.configure({ apiKey: "appl_kguhLcJJUzoHonbGWcUPFuCSmXg" });
      const products = await Purchases.getProducts([productId]);
      if (!products.length) {
        console.error("No products found");
        return;
      }
      const purchase = await Purchases.purchaseProduct(productId);
      console.log("Purchase successful:", purchase);

      // 3. Validate receipt with backend
      this.validatePurchase(orderId, purchase.transactionReceipt);

    } catch (error) {
      console.error('Purchase Error:', error);
      throw error;
    }
  }
}

export default new PurchaseManager();
