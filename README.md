# saturn-protocol

Learn more:

* Website -> https://saturn.network
* Deployed on ETH -> https://etherscan.io/address/0xaA5bBD5A177A588b9F213505cA3740b444Dbd586#code

Installation:

* `yarn add saturn-protocol` or `npm install saturn-protocol`

### Disclaimer

**Team Saturn accepts no responsibility for any lost funds due to tokens not being compatible with Saturn Protocol's order book contracts. If any of the trading tests outlined in our self listing guide fail for your token, then do not announce your listing as your token's smart contract is not compatible with our exchange protocol. Reach out via the form below and we will investigate together.**

[Contact Team Saturn](https://forms.gle/QjtUYcbttCeyUfK48)


### Upgrades
* added truffle env
* added typechain
* exports `create` function

### Example

```ts
import Web3 from 'web3'
import { create, abi, bytecode } from 'saturn-protocol'

import type { 
  Exchange, NewOrder, Trade, Mined,
  OrderCancelled, OrderFulfilled, ERC20
} from 'saturn-protocol'

const web3: Web3 = new Web3(new Web3.providers.HttpProvider('https://ethercluster.com/etc'))
const contractAddress = '0x5EF83Ab1155786f146c5A00722bEF7aB683Dc0DE'

const exchange = create(web3, contractAddress)

exchange.methods.treasury().call().then(async treasury => {
  console.log(treasury)
  console.log(bytecode)
  console.log(abi)

  const enceladus: Exchange = <any> new web3.eth.Contract(
    abi, '0x3ec00ee8a4fbe81e7eea328029ce490654e8e11a'
  )

  const treasury2 = await enceladus.methods.treasury().call()

  console.log(treasury2)
})


```
### Supported tokens

The protocol supports self-listing of properly developed ERC20 and ERC223 standard tokens. Most tokens, such as [SATURN](https://etherscan.io/token/0xb9440022a095343b440d590fcd2d7a3794bd76c8), [DAI](https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f), [LINK](https://etherscan.io/token/0x514910771af9ca656af840dff83e8264ecf986ca) are tradable out of the box.

If you or your developers have made any modifications to the source code of ERC20 or ERC223 standards, your token might not be able to work with Saturn Protocol. Furthermore, due to a [vulnerability in ERC20 design your ERC20 tokens may get permanently lost if mishandled](https://www.saturn.network/blog/advantages-of-erc223-tokens/)!

While 99% of all existing tokens are supported out of the box, you should go through the full [self listing guide](https://www.saturn.network/blog/token-self-listing-guide/) to ensure your community will have a smooth and secure trading experience.

Reference implementations that are guaranteed to work:

* https://github.com/saturn-network/wetc223
* https://github.com/smartcontractkit/LinkToken

### Reference ABIs

#### ERC223

```solidity
contract ERC223 {
  uint public totalSupply;
  function balanceOf(address who) constant public returns (uint);

  function name() constant public returns (string _name);
  function symbol() constant public returns (string _symbol);
  function decimals() constant public returns (uint8 _decimals);
  function totalSupply() constant public returns (uint256 _supply);

  function transfer(address to, uint value) public returns (bool ok);
  function transfer(address to, uint value, bytes data) public returns (bool ok);
  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  event ERC223Transfer(address indexed _from, address indexed _to, uint256 _value, bytes _data);
}
```

#### ERC20

```solidity
contract ERC20 {
  function totalSupply() public view returns (uint);
  function balanceOf(address holder) public view returns (uint);
  function allowance(address holder, address other) public view returns (uint);

  function approve(address other, uint amount) public returns (bool);
  function transfer(address to, uint amount) public returns (bool);
  function transferFrom(address from, address to, uint amount) public returns (bool);
}
```
