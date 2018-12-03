const BBOHoldingContract = artifacts.require("BBOHoldingContract");
const BBOTest = artifacts.require("BBOTest");
var Web3 = require('web3');
var Helpers = require('./../helpers/helpers.js');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var BigNumber = require('bignumber.js')



contract('BBOHoldingContract', async (accounts) => {

    var erc20;
    var contract;
    var admin;

    it("initialize BBOHoldingContract contract", async () => {
        erc20 = await BBOTest.new({
            from: accounts[0]
        });

        admin = accounts[9];

        contract = await BBOHoldingContract.new(erc20.address, admin, {
            from: accounts[0]
        });

        await erc20.transfer(contract.address, 1000e18, {
            from: accounts[0]
        });

        await erc20.transfer(accounts[1], 1000e18, {
            from: accounts[0]
        });
        await erc20.transfer(accounts[2], 1000e18, {
            from: accounts[0]
        });

        await erc20.transfer(accounts[3], 500e18, {
            from: accounts[0]
        });

        await erc20.transfer(accounts[4], 500e18, {
            from: accounts[0]
        });

        return true;

    });

    it("[Fail] request holding without Start Program ", async () => {
        await erc20.approve(contract.address, 200e18, {
            from: accounts[1]
        });
        try {
            await web3.eth.sendTransaction({
                from: accounts[1],
                to: contract.address,
                value: web3.utils.toWei('0', "ether")
            });
            console.log('[Fail] request holding without Start Program OK');
            return false;
        } catch (e) {
            return true;
        }

    });

    it("[Fail] Not admin  Start Program", async () => {
        try {
            let jobLog = await contract.start({
                from: accounts[0]
            });
            return false;
        } catch (e) {
            return true;
        }

    });

    it("Start Program", async () => {
        let jobLog = await contract.start({
            from: admin
        });

        assert(jobLog.logs.length > 0);

    });

    it("[Fail] Start Program again", async () => {
        try {
            await contract.start({
                from: admin
            });
            return false;
        } catch (e) {
            return true;
        }

    });

    it("[Fail] request holding without approve ", async () => {
        try {
            await web3.eth.sendTransaction({
                from: accounts[1],
                to: contract.address,
                value: web3.utils.toWei('0', "ether")
            });
            return false;
        } catch (e) {
            return true;
        }

    });

    it("[Fail] request holding without balance BBO <= 0 ", async () => {
        await erc20.approve(contract.address, 200e18, {
            from: accounts[5]
        });
        try {
            await web3.eth.sendTransaction({
                from: accounts[5],
                to: contract.address,
                value: web3.utils.toWei('0', "ether")
            });
            return false;
        } catch (e) {
            return true;
        }

    });

    it("Request holding BBO Token ", async () => {
        await erc20.approve(contract.address, 200e18, {
            from: accounts[1]
        });

        await erc20.approve(contract.address, 300e18, {
            from: accounts[2]
        });

        await erc20.approve(contract.address, 3000e18, {
            from: accounts[3]
        });

        await erc20.approve(contract.address, 500e18, {
            from: accounts[3]
        });

        await erc20.approve(contract.address, 500e18, {
            from: accounts[4]
        });


        await web3.eth.sendTransaction({
            from: accounts[1],
            to: contract.address,
            value: web3.utils.toWei('0', "ether")
        });

        await web3.eth.sendTransaction({
            from: accounts[2],
            to: contract.address,
            value: web3.utils.toWei('0', "ether")
        });

        await web3.eth.sendTransaction({
            from: accounts[3],
            to: contract.address,
            value: web3.utils.toWei('0', "ether")
        });

        await web3.eth.sendTransaction({
            from: accounts[4],
            to: contract.address,
            value: web3.utils.toWei('0', "ether")
        });

        let bbo = await contract.bboBalance({
            from: accounts[1]
        });

        assert.equal(JSON.stringify(bbo), JSON.stringify(new BigNumber(2700e18)));

    });

    it("[Fail] Request Deposit holding BBO Token again without approve", async () => {

        try {
            await web3.eth.sendTransaction({
                from: accounts[1],
                to: contract.address,
                value: web3.utils.toWei('0', "ether")
            });
            console.log('[Fail] Request Deposit holding BBO Token again without approve OK');
            return false;
        } catch (e) {
            return true;
        }

    });

    it("Request Deposit holding BBO Token again", async () => {

        await erc20.approve(contract.address, 100e18, {
            from: accounts[1]
        });
        await web3.eth.sendTransaction({
            from: accounts[1],
            to: contract.address,
            value: web3.utils.toWei('0', "ether")
        });

        let bbo = await contract.bboBalance({
            from: accounts[1]
        });

        assert.equal(JSON.stringify(bbo), JSON.stringify(new BigNumber(2800e18)));

        let zzzm = await erc20.balanceOf(accounts[1], {
            from: accounts[1]
        });

        assert.equal(JSON.stringify(zzzm), JSON.stringify(new BigNumber(500e18)));

    });

    it("fast forward to 540 days after start program", function () {
        var fastForwardTime = 540 * 24 * 3600 + 1;
        return Helpers.sendPromise('evm_increaseTime', [fastForwardTime]).then(function () {
            return Helpers.sendPromise('evm_mine', []).then(function () {

            });
        });
    });

    it("Withdraw BBO", async () => {

        let bbo = await contract.bboBalance({
            from: accounts[1]
        });
        //console.log('BBO contract', JSON.stringify(bbo));

        await web3.eth.sendTransaction({
            from: accounts[1],
            to: contract.address,
            value: web3.utils.toWei('0.000001', "ether")
        });


        bbo = await contract.bboBalance({
            from: accounts[1]
        });
        //console.log('BBO contract', JSON.stringify(bbo));

        await web3.eth.sendTransaction({
            from: accounts[2],
            to: contract.address,
            value: web3.utils.toWei('0', "ether")
        });

        bbo = await contract.bboBalance({
            from: accounts[1]
        });
        //console.log('BBO contract', JSON.stringify(bbo));

        await web3.eth.sendTransaction({
            from: accounts[3],
            to: contract.address,
            value: web3.utils.toWei('0', "ether")
        });

        await web3.eth.sendTransaction({
            from: accounts[1],
            to: contract.address,
            value: web3.utils.toWei('0', "ether")
        });

        let bboB = await erc20.balanceOf(accounts[1], {
            from: accounts[1]
        });

        let bboC = await erc20.balanceOf(accounts[2], {
            from: accounts[1]
        });

        let bboD = await erc20.balanceOf(accounts[3], {
            from: accounts[1]
        });

        bbo = await contract.bboBalance({
            from: accounts[1]
        });
        //console.log('BBO contract', JSON.stringify(bbo));

        // console.log(JSON.stringify(bboB));
        // console.log(JSON.stringify(bboC));
        // console.log(JSON.stringify(bboD));

        return true;

    });

    it("[Fail] Withdraw BBO aagian", async () => {
        try {
            await web3.eth.sendTransaction({
                from: accounts[2],
                to: contract.address,
                value: web3.utils.toWei('0', "ether")
            });
            return false;
        } catch (e) {
            return true;
        }
    });

    it("[Fail] Drain BBO with time < DRAIN_DELAY", async () => {
        try {
            await contract.drain({
                from: admin
            });
            return false;
        } catch (e) {
            return true;
        }
    });

    it("fast forward to 1080 days to drain", function () {
        var fastForwardTime = 1080 * 24 * 3600 + 1;
        return Helpers.sendPromise('evm_increaseTime', [fastForwardTime]).then(function () {
            return Helpers.sendPromise('evm_mine', []).then(function () {

            });
        });
    });

    it("[Fail] Not admin Drain", async () => {
        try {
            await contract.drain({
                from: accounts[0]
            });
            console.log("[Fail] Not admin Drain OK");
            return false;
        } catch (e) {
            return true;
        }
    });

    it("Drain BBO", async () => {
        await contract.drain({
            from: admin
        });

        let bbo = await contract.bboBalance({
            from: accounts[1]
        });

        assert(bbo.c[0] <= 0);
       
    });



});