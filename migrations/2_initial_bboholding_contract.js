var BBOHoldingContract = artifacts.require("./BBOHoldingContract.sol");
var BBOTest = artifacts.require("./BBOTest.sol");

module.exports = function (deployer) {
    console.log('Run 2_initial_bboholding_contract');
    if (deployer.network_id != 3) {
        var instance;
        deployer.deploy(BBOTest).then(function (rs) {
            instance = rs;
            console.log('Deployed BBO at address ', instance.address);

            return deployer.deploy(BBOHoldingContract, instance.address, '0x83e5353fC26643c29B041A3b692c6335c97A9aed');
        });
    } else if (deployer.network_id == 3) {
        console.log('Bigin deploy to Test Net');
        // let bboAddress = '0x1d893910d30edc1281d97aecfe10aefeabe0c41b';
        // deployer.deploy(BBOHoldingContract, bboAddress, '0x83e5353fC26643c29B041A3b692c6335c97A9aed').then(function(rs){
        //     console.log('Done');
        // });;
        var instance;
        deployer.deploy(BBOTest).then(function (rs) {
            instance = rs;
            console.log('Deployed BBO at address ', instance.address);

            return deployer.deploy(BBOHoldingContract, instance.address, '0x83e5353fC26643c29B041A3b692c6335c97A9aed');
        });
    }

};