import { getContract, getReadOnlyContract } from "@blockchain/services/contract";

// ==========================================
// FUNCIONES DE LECTURA (READ ON-CHAIN)
// ==========================================

/**
 * 🟡 LEER: Devuelve la lista de ISINs que el usuario tiene o ha tenido alguna vez.
 */
export async function getUserPortfolioIsins(userAddress) {
  const contract = await getReadOnlyContract();
  return await contract.getUserPortfolioIsins(userAddress);
}

/**
 * 🔵 LEER: Devuelve el balance exacto de unidades de un activo para un usuario.
 */
export async function getAssetBalance(userAddress, isin) {
  const contract = await getReadOnlyContract();
  return await contract.getAssetBalance(userAddress, isin);
}

/**
 * 🔵 LEER: Helper para React optimizado. Obtiene los ISINs del usuario y consulta el balance
 * de cada uno en paralelo para devolver el portafolio completo filtrado (solo los > 0).
 */
export async function getMyPortfolio(userAddress) {
  const isins = await getUserPortfolioIsins(userAddress);

  // Lanzamos todas las consultas de balance en paralelo al nodo RPC
  const balancePromises = isins.map((isin) => getAssetBalance(userAddress, isin));
  const balances = await Promise.all(balancePromises);

  const portfolio = [];

  // Construimos el portafolio final filtrando los saldos vacíos
  for (let i = 0; i < isins.length; i++) {
    if (balances[i] > 0n) {
      portfolio.push({
        isin: isins[i],
        quantity: balances[i],
      });
    }
  }

  return portfolio;
}

/**
 * 🟡 LEER: Obtener el historial cronológico de transacciones (Auditoría del usuario)
 */
export async function getTransactionHistory(userAddress) {
  const contract = await getReadOnlyContract();
  const history = await contract.getTransactionHistory(userAddress);

  return history.map((record) => ({
    isin: record.isin,
    opType: record.opType, 
    amount: record.amount,
    price: record.price,
    commissionPaid: record.commissionPaid,
    timestamp: record.timestamp,
  }));
}

// ==========================================
// FUNCIONES DE ESCRITURA (TRANSACTIONS)
// ==========================================

/**
 * 🟡 LEER: Devuelve la comisión exacta en Wei requerida para una operación.
 */
export async function getRequiredCommission(amount, priceUsd) {
  const contract = await getReadOnlyContract();
  const amountBig = BigInt(amount);
  const priceBig = BigInt(Math.round(priceUsd));
  const commissionPercentage = await contract.commissionPercentage();
  const totalVolume = amountBig * priceBig;
  return (totalVolume * commissionPercentage) / 10000n;
}

/**
 * 🟢 ESCRIBIR: Comprar un activo pagando únicamente la comisión en Wei.
 */
export async function buyAsset(isin, amount, priceUsd) {
  const contract = await getContract();

  const amountBig = BigInt(amount);
  const priceBig = BigInt(Math.round(priceUsd));

  // Calculamos la comisión obligatoria
  const commissionPercentage = await contract.commissionPercentage();
  const totalVolume = amountBig * priceBig;
  const requiredCommission = (totalVolume * commissionPercentage) / 10000n;

  // Ejecutamos la transacción enviando la comisión exacta en el 'value'
  const tx = await contract.buyAsset(isin, amountBig, priceBig, {
    value: requiredCommission
  });

  return await tx.wait();
}

/**
 * 🔴 ESCRIBIR: Vender un activo pagando únicamente la comisión en Wei.
 */
export async function sellAsset(isin, amount, priceUsd) {
  const contract = await getContract();

  const amountBig = BigInt(amount);
  const priceBig = BigInt(Math.round(priceUsd));

  // Calculamos la comisión obligatoria
  const commissionPercentage = await contract.commissionPercentage();
  const totalVolume = amountBig * priceBig;
  const requiredCommission = (totalVolume * commissionPercentage) / 10000n;

  const tx = await contract.sellAsset(isin, amountBig, priceBig, {
    value: requiredCommission
  });

  return await tx.wait();
}

// ==========================================
// METRICAS GLOBALES Y ADMIN
// ==========================================

/**
 * 🟡 LEER: Obtener la dirección del Owner/Admin del contrato
 */
export async function getContractOwner() {
  const contract = await getReadOnlyContract();
  return await contract.owner();
}

/**
 * 🟡 LEER: Obtener el número total de transacciones procesadas por el broker
 */
export async function getTotalTrades() {
  const contract = await getReadOnlyContract();
  return await contract.totalTrades();
}