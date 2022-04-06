
const CONTRACTS = {
    'PCS_ROUTER' : '0x10ed43c718714eb63d5aa57b78b54704e256024e',
    'WBNB' : '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    'BUSD' : '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    'ETH' : '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    'BTCB': '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    'ADA' : '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47'
}
let provider, router;

const main = async function() {
    provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    router = new ethers.Contract( CONTRACTS['PCS_ROUTER'], ['function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)', 'function symbol() external view returns (string memory)'], provider);
    updatePrice('main-text-bnb',  [CONTRACTS['WBNB'], CONTRACTS['BUSD']]);
    updatePrice('main-text-eth',  [CONTRACTS['ETH'], CONTRACTS['BUSD']]);
    updatePrice('main-text-btc',  [CONTRACTS['BTCB'], CONTRACTS['BUSD']]);
    updatePrice('main-text-ada',  [CONTRACTS['ADA'], CONTRACTS['BUSD']]);
    setTimeout(main, 5000);
}   

const updatePrice = async function(elementId, contracts) {
    let price = await router.getAmountsOut(ethers.utils.parseUnits('1.0', 'ether'),contracts);
    document.getElementById(elementId).innerHTML = parseFloat(ethers.utils.formatEther(price[1])).toFixed(4).toLocaleString("en-US");
}

main();