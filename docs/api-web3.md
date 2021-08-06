## Classes

<dl>
<dt><a href="#SolidityUtilities">SolidityUtilities</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#resetContracts">resetContracts</a></dt>
<dd><p>Reset contracts</p>
</dd>
<dt><a href="#newContract">newContract</a> ⇒ <code>*</code></dt>
<dd><p>New contract</p>
</dd>
<dt><a href="#getAllContracts">getAllContracts</a> ⇒ <code>Object</code></dt>
<dd><p>Get all contracts</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#blockchainCall">blockchainCall(adapters, value, oldCall)</a> ⇒ <code>Promise.&lt;(*|Promise.&lt;unknown&gt;)&gt;</code></dt>
<dd><p>Exec a blockchainCall</p>
</dd>
<dt><a href="#checkMandatoryFunctionalityProposalConstraints">checkMandatoryFunctionalityProposalConstraints(abi, isOneTime, noMetadata)</a> ⇒ <code>Promise.&lt;(*|Promise.&lt;unknown&gt;)&gt;</code></dt>
<dd><p>Validate the mandatory functionality proposal constrains</p>
</dd>
<dt><a href="#createContract">createContract(adapters, abi, data)</a> ⇒ <code>Promise.&lt;*&gt;</code></dt>
<dd><p>Create a contract</p>
</dd>
<dt><a href="#createWeb3">createWeb3(connectionProvider)</a> ⇒ <code>Promise.&lt;Web3&gt;</code></dt>
<dd><p>Create web3 instance</p>
</dd>
<dt><a href="#deployMetadataLink">deployMetadataLink(adapters, metadata, functionalitiesManager)</a> ⇒ <code>Promise.&lt;*&gt;</code></dt>
<dd><p>Deploy metadata link</p>
</dd>
<dt><a href="#extractComment">extractComment(adapters, code, element)</a> ⇒ <code><a href="#ExtractCommentReturn">ExtractCommentReturn</a></code></dt>
<dd><p>Extract the comment from the code</p>
</dd>
<dt><a href="#extractHTMLDescription">extractHTMLDescription(adapters, code, updateFirst)</a> ⇒ <code>string</code></dt>
<dd><p>Extract html descriptions</p>
</dd>
<dt><a href="#formatLink">formatLink(adapters, link)</a> ⇒ <code>string</code> | <code>*</code> | <code>string</code></dt>
<dd><p>Format link</p>
</dd>
<dt><a href="#generateAndCompileContract">generateAndCompileContract(sourceCode, lines, descriptions, updates, prefixedLines, postFixedLines)</a> ⇒ <code>Promise.&lt;{sourceCode, selectedContract: *}&gt;</code></dt>
<dd><p>Generate and compile a contract</p>
</dd>
<dt><a href="#generateFunctionalityMetadataLink">generateFunctionalityMetadataLink(adapters, data)</a> ⇒</dt>
<dd><p>Generate functionality metadata link</p>
</dd>
<dt><a href="#getAddress">getAddress(adapters)</a> ⇒</dt>
<dd><p>Get current ethereum address</p>
</dd>
<dt><a href="#getElementImage">getElementImage(adapters, element)</a> ⇒ <code>string</code> | <code>*</code></dt>
<dd><p>Get the element image</p>
</dd>
<dt><a href="#getEthereumPrice">getEthereumPrice(adapters)</a> ⇒ <code>Promise.&lt;*&gt;</code></dt>
<dd><p>Get the ethereum price</p>
</dd>
<dt><a href="#getLogs">getLogs(adapters, element, endOnFirstResult)</a> ⇒ <code>Promise.&lt;*&gt;</code></dt>
<dd><p>Get logs</p>
</dd>
<dt><a href="#getNetworkElement">getNetworkElement(adapters)</a> ⇒ <code>*</code></dt>
<dd><p>Get network element</p>
</dd>
<dt><a href="#getNextFunctionalityVersion">getNextFunctionalityVersion(adapters, codeName, replaces)</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Get next functionality version</p>
</dd>
<dt><a href="#getSendingOptions">getSendingOptions(adapters, transaction, value)</a> ⇒ <code>Promise.&lt;unknown&gt;</code></dt>
<dd><p>Get sending options</p>
</dd>
<dt><a href="#getSupportedSolidityVersion">getSupportedSolidityVersion()</a> ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code></dt>
<dd><p>Get supported solidity version</p>
</dd>
<dt><a href="#initConnection">initConnection(environment, onUpdate)</a> ⇒ <code>Promise.&lt;(void|{uniswapV2Factory: *, walletAvatar: (string|string), web3ForLogs: *, uniswapV2Router: *, wethAddress: *, web3: {currentProvider}, networkId: *, walletAddress: *, proxyChangedTopic: *})&gt;</code></dt>
<dd><p>Initialize the connection</p>
</dd>
<dt><a href="#loadBlockSearchTranches">loadBlockSearchTranches(adapters)</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Load block search trances</p>
</dd>
<dt><a href="#loadContent">loadContent(adapters, tokenId, ocelotAddress, raw)</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Load content</p>
</dd>
<dt><a href="#loadContentMetadata">loadContentMetadata(adapters, tokenId, ocelotContract)</a> ⇒ <code>Promise.&lt;*&gt;</code></dt>
<dd><p>Load content metadata</p>
</dd>
<dt><a href="#loadFunctionality">loadFunctionality(adapters, functionalityName, organization)</a> ⇒ <code>Promise.&lt;any&gt;</code></dt>
<dd><p>Load functionality</p>
</dd>
<dt><a href="#loadFunctionalityNames">loadFunctionalityNames(adapters, element)</a> ⇒ <code>Promise.&lt;*&gt;</code></dt>
<dd><p>Load functionality names</p>
</dd>
<dt><a href="#loadMetadatas">loadMetadatas(adapters)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Load metadatas</p>
</dd>
<dt><a href="#loadOffChainWallets">loadOffChainWallets(adapters)</a> ⇒ <code>Promise.&lt;{&#x27;Programmable Equities&#x27;: Array.&lt;T&gt;, Items: Array.&lt;T&gt;, Indexes: Array.&lt;T&gt;, Tokens: Array.&lt;T&gt;}&gt;</code></dt>
<dd><p>Load Off Chain wallets</p>
</dd>
<dt><a href="#loadTokenInfos">loadTokenInfos(adapters, addresses, wethAddress)</a> ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> | <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Load token infos</p>
</dd>
<dt><a href="#mint">mint(adapters, inputs, ocelotAddress, silent, firstChunkCallback, tokenId, start)</a> ⇒ <code>Promise.&lt;*&gt;</code></dt>
<dd><p>Mint</p>
</dd>
<dt><a href="#packCollection">packCollection(adapters, category, modelAddress)</a> ⇒ <code>*</code></dt>
<dd><p>Pack collection</p>
</dd>
<dt><a href="#refreshBalances">refreshBalances(adapters, element, silent)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Refresh balances</p>
</dd>
<dt><a href="#searchForCodeErrors">searchForCodeErrors(adapters, location, code, codeName, methodSignature, replaces, noCode)</a> ⇒ <code>Promise.&lt;array&gt;</code></dt>
<dd><p>Search for code errors</p>
</dd>
<dt><a href="#sendBlockchainTransaction">sendBlockchainTransaction(adapters, value, transaction)</a> ⇒ <code>Promise.&lt;unknown&gt;</code></dt>
<dd><p>Send blockchain transaction</p>
</dd>
<dt><a href="#sendGeneratedProposal">sendGeneratedProposal(element, ctx, template, lines, descriptions, updates, prefixedLines, postFixedLines)</a> ⇒ <code>Object</code></dt>
<dd><p>Send generated proposal</p>
</dd>
<dt><a href="#split">split(adapters, content, length)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Split</p>
</dd>
<dt><a href="#swap">swap(adapters, organization, amount, from, to)</a> ⇒ <code>Promise</code></dt>
<dd><p>Swap</p>
</dd>
<dt><a href="#transfer">transfer(adapters, organization, tokenAddress, amounts, sendTos, tokenId, payload)</a> ⇒ <code>Promise</code></dt>
<dd><p>Transfer</p>
</dd>
<dt><a href="#uploadToIPFS">uploadToIPFS(adapters)</a> ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code></dt>
<dd><p>Upload to IPFS</p>
</dd>
<dt><a href="#validateDFOMetadata">validateDFOMetadata(adapters, metadata, noUpload)</a> ⇒ <code>Promise.&lt;(*|*)&gt;</code></dt>
<dd><p>Validate DFO metadata</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ExtractCommentReturn">ExtractCommentReturn</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="SolidityUtilities"></a>

## SolidityUtilities
**Kind**: global class  
<a name="new_SolidityUtilities_new"></a>

### new SolidityUtilities()
Get solidity utilities

<a name="resetContracts"></a>

## resetContracts
Reset contracts

**Kind**: global constant  
<a name="newContract"></a>

## newContract ⇒ <code>\*</code>
New contract

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| abi |  |  |
| address |  |  |

<a name="getAllContracts"></a>

## getAllContracts ⇒ <code>Object</code>
Get all contracts

**Kind**: global constant  
<a name="blockchainCall"></a>

## blockchainCall(adapters, value, oldCall) ⇒ <code>Promise.&lt;(\*\|Promise.&lt;unknown&gt;)&gt;</code>
Exec a blockchainCall

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| adapters.context | <code>EthosContext</code> | The application context. |
| value | <code>function</code> |  |
| oldCall | <code>function</code> |  |

<a name="checkMandatoryFunctionalityProposalConstraints"></a>

## checkMandatoryFunctionalityProposalConstraints(abi, isOneTime, noMetadata) ⇒ <code>Promise.&lt;(\*\|Promise.&lt;unknown&gt;)&gt;</code>
Validate the mandatory functionality proposal constrains

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| abi | <code>Array.&lt;voice&gt;</code> | The list of arguments. |
| isOneTime | <code>boolean</code> | The function run one time and doesn't require onStart and onStop |
| noMetadata | <code>boolean</code> | The function does not require metadata functions |

<a name="createContract"></a>

## createContract(adapters, abi, data) ⇒ <code>Promise.&lt;\*&gt;</code>
Create a contract

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| adapters.context | <code>EthosContext</code> | The application context. |
| abi |  |  |
| data |  |  |

<a name="createWeb3"></a>

## createWeb3(connectionProvider) ⇒ <code>Promise.&lt;Web3&gt;</code>
Create web3 instance

**Kind**: global function  

| Param |
| --- |
| connectionProvider | 

<a name="deployMetadataLink"></a>

## deployMetadataLink(adapters, metadata, functionalitiesManager) ⇒ <code>Promise.&lt;\*&gt;</code>
Deploy metadata link

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| adapters.context | <code>EthosContext</code> | The application context. |
| adapters.networkId | <code>string</code> | The network id. |
| adapters.ipfsHttpClient | <code>IpfsHttpClient</code> | The ipfsHttpClient. |
| metadata |  |  |
| functionalitiesManager |  |  |

<a name="extractComment"></a>

## extractComment(adapters, code, element) ⇒ [<code>ExtractCommentReturn</code>](#ExtractCommentReturn)
Extract the comment from the code

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.context | <code>EthosContext</code> | The application context. |
| code | <code>string</code> |  |
| element | <code>string</code> |  |

<a name="extractHTMLDescription"></a>

## extractHTMLDescription(adapters, code, updateFirst) ⇒ <code>string</code>
Extract html descriptions

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.context | <code>EthosContext</code> | The application context. |
| code |  |  |
| updateFirst |  |  |

<a name="formatLink"></a>

## formatLink(adapters, link) ⇒ <code>string</code> \| <code>\*</code> \| <code>string</code>
Format link

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.context | <code>EthosContext</code> | The application context. |
| link |  |  |

<a name="generateAndCompileContract"></a>

## generateAndCompileContract(sourceCode, lines, descriptions, updates, prefixedLines, postFixedLines) ⇒ <code>Promise.&lt;{sourceCode, selectedContract: \*}&gt;</code>
Generate and compile a contract

**Kind**: global function  

| Param |
| --- |
| sourceCode | 
| lines | 
| descriptions | 
| updates | 
| prefixedLines | 
| postFixedLines | 

<a name="generateFunctionalityMetadataLink"></a>

## generateFunctionalityMetadataLink(adapters, data) ⇒
Generate functionality metadata link

**Kind**: global function  
**Returns**: Promise<>  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| adapters.context | <code>EthosContext</code> | The application context. |
| adapters.ipfsHttpClient | <code>IpfsHttpClient</code> | The ipfsHttpClient. |
| data |  |  |

<a name="getAddress"></a>

## getAddress(adapters) ⇒
Get current ethereum address

**Kind**: global function  
**Returns**: Promise<string>  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |

<a name="getElementImage"></a>

## getElementImage(adapters, element) ⇒ <code>string</code> \| <code>\*</code>
Get the element image

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.context | <code>EthosContext</code> | The application context. |
| element |  |  |

<a name="getEthereumPrice"></a>

## getEthereumPrice(adapters) ⇒ <code>Promise.&lt;\*&gt;</code>
Get the ethereum price

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.context | <code>EthosContext</code> | The application context. |

<a name="getLogs"></a>

## getLogs(adapters, element, endOnFirstResult) ⇒ <code>Promise.&lt;\*&gt;</code>
Get logs

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| adapters.web3ForLogs | <code>web3</code> | The web3 for log instancee. |
| adapters.context | <code>EthosContext</code> | The application context. |
| adapters.networkId | <code>string</code> | The network id. |
| element |  |  |
| endOnFirstResult |  |  |

<a name="getNetworkElement"></a>

## getNetworkElement(adapters) ⇒ <code>\*</code>
Get network element

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.context | <code>EthosContext</code> | The application context. |
| adapters.networkId | <code>string</code> | The network id. * @param element |

<a name="getNextFunctionalityVersion"></a>

## getNextFunctionalityVersion(adapters, codeName, replaces) ⇒ <code>Promise.&lt;number&gt;</code>
Get next functionality version

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| adapters.context | <code>EthosContext</code> | The application context. |
| codeName |  |  |
| replaces |  |  |

<a name="getSendingOptions"></a>

## getSendingOptions(adapters, transaction, value) ⇒ <code>Promise.&lt;unknown&gt;</code>
Get sending options

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| transaction |  |  |
| value |  |  |

<a name="getSupportedSolidityVersion"></a>

## getSupportedSolidityVersion() ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
Get supported solidity version

**Kind**: global function  
<a name="initConnection"></a>

## initConnection(environment, onUpdate) ⇒ <code>Promise.&lt;(void\|{uniswapV2Factory: \*, walletAvatar: (string\|string), web3ForLogs: \*, uniswapV2Router: \*, wethAddress: \*, web3: {currentProvider}, networkId: \*, walletAddress: \*, proxyChangedTopic: \*})&gt;</code>
Initialize the connection

**Kind**: global function  

| Param |
| --- |
| environment | 
| onUpdate | 

<a name="loadBlockSearchTranches"></a>

## loadBlockSearchTranches(adapters) ⇒ <code>Promise.&lt;Array&gt;</code>
Load block search trances

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| adapters.context | <code>EthosContext</code> | The application context. |
| adapters.networkId | <code>string</code> | The network id. |

<a name="loadContent"></a>

## loadContent(adapters, tokenId, ocelotAddress, raw) ⇒ <code>Promise.&lt;string&gt;</code>
Load content

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| adapters.context | <code>EthosContext</code> | The application context. |
| adapters.networkId | <code>string</code> | The network id. |
| tokenId |  |  |
| ocelotAddress |  |  |
| raw |  |  |

<a name="loadContentMetadata"></a>

## loadContentMetadata(adapters, tokenId, ocelotContract) ⇒ <code>Promise.&lt;\*&gt;</code>
Load content metadata

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| adapters.context | <code>EthosContext</code> | The application context. |
| tokenId |  |  |
| ocelotContract |  |  |

<a name="loadFunctionality"></a>

## loadFunctionality(adapters, functionalityName, organization) ⇒ <code>Promise.&lt;any&gt;</code>
Load functionality

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| adapters.context | <code>EthosContext</code> | The application context. |
| adapters.networkId | <code>string</code> | The network id. |
| functionalityName |  |  |
| organization |  |  |

<a name="loadFunctionalityNames"></a>

## loadFunctionalityNames(adapters, element) ⇒ <code>Promise.&lt;\*&gt;</code>
Load functionality names

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| adapters.context | <code>EthosContext</code> | The application context. |
| element |  |  |

<a name="loadMetadatas"></a>

## loadMetadatas(adapters) ⇒ <code>Promise.&lt;void&gt;</code>
Load metadatas

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.context | <code>EthosContext</code> | The application context. |

<a name="loadOffChainWallets"></a>

## loadOffChainWallets(adapters) ⇒ <code>Promise.&lt;{&#x27;Programmable Equities&#x27;: Array.&lt;T&gt;, Items: Array.&lt;T&gt;, Indexes: Array.&lt;T&gt;, Tokens: Array.&lt;T&gt;}&gt;</code>
Load Off Chain wallets

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| adapters.context | <code>EthosContext</code> | The application context. |
| adapters.networkId | <code>string</code> | The network id. |

<a name="loadTokenInfos"></a>

## loadTokenInfos(adapters, addresses, wethAddress) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> \| <code>Promise.&lt;string&gt;</code>
Load token infos

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| adapters.context | <code>EthosContext</code> | The application context. |
| addresses |  |  |
| wethAddress |  |  |

<a name="mint"></a>

## mint(adapters, inputs, ocelotAddress, silent, firstChunkCallback, tokenId, start) ⇒ <code>Promise.&lt;\*&gt;</code>
Mint

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| adapters.context | <code>EthosContext</code> | The application context. |
| adapters.networkId | <code>string</code> | The network id. |
| adapters.ethosEvents | <code>ethosEvents</code> | The pub sub event manager. |
| inputs |  |  |
| ocelotAddress |  |  |
| silent |  |  |
| firstChunkCallback |  |  |
| tokenId |  |  |
| start |  |  |

<a name="packCollection"></a>

## packCollection(adapters, category, modelAddress) ⇒ <code>\*</code>
Pack collection

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| adapters.context | <code>EthosContext</code> | The application context. |
| category |  |  |
| modelAddress |  |  |

<a name="refreshBalances"></a>

## refreshBalances(adapters, element, silent) ⇒ <code>Promise.&lt;void&gt;</code>
Refresh balances

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| adapters.context | <code>EthosContext</code> | The application context. |
| adapters.networkId | <code>string</code> | The network id. |
| adapters.dfoHub | <code>dfoHub</code> | The DFOHub object. |
| adapters.uniswapV2Router | <code>uniswapV2Router</code> | The uniswapV2Router |
| adapters.walletAddress | <code>walletAddress</code> | The Wallet address |
| element |  |  |
| silent |  |  |

<a name="searchForCodeErrors"></a>

## searchForCodeErrors(adapters, location, code, codeName, methodSignature, replaces, noCode) ⇒ <code>Promise.&lt;array&gt;</code>
Search for code errors

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.context | <code>EthosContext</code> | The application context. |
| location |  |  |
| code |  |  |
| codeName |  |  |
| methodSignature |  |  |
| replaces |  |  |
| noCode |  |  |

<a name="sendBlockchainTransaction"></a>

## sendBlockchainTransaction(adapters, value, transaction) ⇒ <code>Promise.&lt;unknown&gt;</code>
Send blockchain transaction

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| adapters.context | <code>EthosContext</code> | The application context. |
| value |  |  |
| transaction |  |  |

<a name="sendGeneratedProposal"></a>

## sendGeneratedProposal(element, ctx, template, lines, descriptions, updates, prefixedLines, postFixedLines) ⇒ <code>Object</code>
Send generated proposal

**Kind**: global function  

| Param |
| --- |
| element | 
| ctx | 
| template | 
| lines | 
| descriptions | 
| updates | 
| prefixedLines | 
| postFixedLines | 

<a name="split"></a>

## split(adapters, content, length) ⇒ <code>Array.&lt;string&gt;</code>
Split

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.context | <code>EthosContext</code> | The application context. |
| content |  |  |
| length |  |  |

<a name="swap"></a>

## swap(adapters, organization, amount, from, to) ⇒ <code>Promise</code>
Swap

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| adapters.context | <code>EthosContext</code> | The application context. |
| organization |  |  |
| amount |  |  |
| from |  |  |
| to |  |  |

<a name="transfer"></a>

## transfer(adapters, organization, tokenAddress, amounts, sendTos, tokenId, payload) ⇒ <code>Promise</code>
Transfer

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.web3 | <code>web3</code> | The web3 instance. |
| adapters.context | <code>EthosContext</code> | The application context. |
| adapters.wethAddress | <code>wethAddress</code> | The wethAddress. |
| organization |  |  |
| tokenAddress |  |  |
| amounts |  |  |
| sendTos |  |  |
| tokenId |  |  |
| payload |  |  |

<a name="uploadToIPFS"></a>

## uploadToIPFS(adapters) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
Upload to IPFS

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.ipfsHttpClient | <code>IpfsHttpClient</code> | The web3 instance. |
| adapters.context | <code>EthosContext</code> | The application context. * @param files |

<a name="validateDFOMetadata"></a>

## validateDFOMetadata(adapters, metadata, noUpload) ⇒ <code>Promise.&lt;(\*\|\*)&gt;</code>
Validate DFO metadata

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| adapters | <code>Object</code> | The adapters injected required by the function. |
| adapters.ipfsHttpClient | <code>IpfsHttpClient</code> | The web3 instance. |
| adapters.context | <code>EthosContext</code> | The application context. * @param files |
| metadata |  |  |
| noUpload |  |  |

<a name="ExtractCommentReturn"></a>

## ExtractCommentReturn : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| Description | <code>string</code> | 
| Discussion | <code>string</code> | 
| Update | <code>string</code> | 

