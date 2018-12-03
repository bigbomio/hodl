
pragma solidity ^0.4.24;

import './zeppelin/math/SafeMath.sol';
import './zeppelin/math/Math.sol';
import './zeppelin/token/ERC20/ERC20.sol';

/// @title BibBom Token Holding Incentive Program
/// @author TranTho - <thoff@bigbom.com>.
/// For more information, please visit https://bigbom.com.
contract BBOHoldingContract {
    using SafeMath for uint;
    using Math for uint;
   
    // During the first 60 days of deployment, this contract opens for deposit of BBO.
    uint public constant DEPOSIT_PERIOD             = 60 days; // = 2 months

    // 18 months after deposit, user can withdrawal all or part of his/her BBO with bonus.
    // The bonus is this contract's initial BBO balance.
    uint public constant WITHDRAWAL_DELAY           = 540 days; // = 1 year and 6 months

    // Send 0.001ETH per 10000 BBO partial withdrawal, or 0 for a once-for-all withdrawal.
    // All ETH will be returned.
    uint public constant WITHDRAWAL_SCALE           = 1E7; // 1ETH for withdrawal of 10,000,000 BBO.

    // Ower can drain all remaining BBO after 3 years.
    uint public constant DRAIN_DELAY                = 1080 days; // = 3 years.
    
    address public bboTokenAddress  = 0x0;
    address public owner            = 0x0;

    uint public bboDeposited        = 0;
    uint public depositStartTime    = 0;
    uint public depositStopTime     = 0;

    struct Record {
        uint bboAmount;
        uint timestamp;
    }

    mapping (address => Record) records;
    
    /* 
     * EVENTS
     */

    /// Emitted when program starts.
    event Started(uint _time);

    /// Emitted when all BBO are drained.
    event Drained(uint _bboAmount);

    /// Emitted for each sucuessful deposit.
    uint public depositId = 0;
    event Deposit(uint _depositId, address indexed _addr, uint _bboAmount);

    /// Emitted for each sucuessful deposit.
    uint public withdrawId = 0;
    event Withdrawal(uint _withdrawId, address indexed _addr, uint _bboAmount);

    /// @dev Initialize the contract
    /// @param _bboTokenAddress BBO ERC20 token address
    constructor (address _bboTokenAddress, address _owner) public {
        require(_bboTokenAddress != address(0));
        require(_owner != address(0));

        bboTokenAddress = _bboTokenAddress;
        owner = _owner;
    }

    /*
     * PUBLIC FUNCTIONS
     */

    /// @dev start the program.
    function start() public {
        require(msg.sender == owner);
        require(depositStartTime == 0);

        depositStartTime = now;
        depositStopTime  = depositStartTime + DEPOSIT_PERIOD;

        emit Started(depositStartTime);
    }


    /// @dev drain BBO.
    function drain() public {
        require(msg.sender == owner);
        require(depositStartTime > 0 && now >= depositStartTime + DRAIN_DELAY);

        uint balance = bboBalance();
        require(balance > 0);

        require(ERC20(bboTokenAddress).transfer(owner, balance));

        emit Drained(balance);
    }

    function () payable {
        require(depositStartTime > 0);

        if (now >= depositStartTime && now <= depositStopTime) {
            depositBBO();
        } else if (now > depositStopTime){
            withdrawBBO();
        } else {
            revert();
        }
    }

    /// @return Current BBO balance.
    function bboBalance() public constant returns (uint) {
        return ERC20(bboTokenAddress).balanceOf(address(this));
    }

    /// @dev Deposit BBO.
    function depositBBO() payable {
        require(depositStartTime > 0);
        require(msg.value == 0);
        require(now >= depositStartTime && now <= depositStopTime);
        
        ERC20 bboToken = ERC20(bboTokenAddress);
        uint bboAmount = bboToken
            .balanceOf(msg.sender)
            .min256(bboToken.allowance(msg.sender, address(this)));

        require(bboAmount > 0);

        Record storage record = records[msg.sender];
        record.bboAmount = record.bboAmount.add(bboAmount);
        record.timestamp = now;
        records[msg.sender] = record;

        bboDeposited = bboDeposited.add(bboAmount);

        emit Deposit(depositId++, msg.sender, bboAmount);
        
        require(bboToken.transferFrom(msg.sender, address(this), bboAmount));
    }

    /// @dev Withdrawal BBO.
    function withdrawBBO() payable {
        require(depositStartTime > 0);
        require(bboDeposited > 0);

        Record storage record = records[msg.sender];
        require(now >= record.timestamp + WITHDRAWAL_DELAY);
        require(record.bboAmount > 0);

        uint bboWithdrawalBase = record.bboAmount;
        if (msg.value > 0) {
            bboWithdrawalBase = bboWithdrawalBase
                .min256(msg.value.mul(WITHDRAWAL_SCALE));
        }

        uint bboBonus = getBonus(bboWithdrawalBase);
        uint balance = bboBalance();
        uint bboAmount = balance.min256(bboWithdrawalBase + bboBonus);
        
        bboDeposited = bboDeposited.sub(bboWithdrawalBase);
        record.bboAmount = record.bboAmount.sub(bboWithdrawalBase);

        if (record.bboAmount == 0) {
            delete records[msg.sender];
        } else {
            records[msg.sender] = record;
        }

        emit Withdrawal(withdrawId++, msg.sender, bboAmount);

        require(ERC20(bboTokenAddress).transfer(msg.sender, bboAmount));
        if (msg.value > 0) {
            msg.sender.transfer(msg.value);
        }
    }

    function getBonus(uint _bboWithdrawalBase) constant returns (uint) {
        return internalCalculateBonus(bboBalance() - bboDeposited,bboDeposited, _bboWithdrawalBase);
    }

    function internalCalculateBonus(uint _totalBonusRemaining, uint _bboDeposited, uint _bboWithdrawalBase) constant returns (uint) {
        require(_bboDeposited > 0);
        require(_totalBonusRemaining >= 0);

        // The bonus is non-linear function to incentivize later withdrawal.
        // bonus = _totalBonusRemaining * power(_bboWithdrawalBase/_bboDeposited, 1.0625)
        return _totalBonusRemaining
            .mul(_bboWithdrawalBase.mul(sqrt(sqrt(sqrt(sqrt(_bboWithdrawalBase))))))
            .div(_bboDeposited.mul(sqrt(sqrt(sqrt(sqrt(_bboDeposited))))));
    }

    function sqrt(uint x) internal constant returns (uint) {
        uint y = x;
        while (true) {
            uint z = (y + (x / y)) / 2;
            uint w = (z + (x / z)) / 2;
            if (w == y) {
                if (w < y) return w;
                else return y;
            }
            y = w;
        }
    }
}