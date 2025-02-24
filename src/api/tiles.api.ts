import { ethers } from 'ethers';
import _ from 'lodash';

import { EthersApi } from './ethers.api';

import { TILES_CONTRACT, TileTypes } from 'shared/constants';

import TILES_ABI from 'data/abi/tiles.abi.json';

const tilesContract = EthersApi.makeContract(TILES_CONTRACT, TILES_ABI, 'polygon');

export class TilesApi {
  public static getTilesByAddress(address: any): any {
    return tilesContract.tilesBalances(address);
  }

  public static async craftTiles(ids: number[]): Promise<any> {
    const contractWithSigner: any = EthersApi.makeContractWithSigner(TILES_CONTRACT, TILES_ABI);
    const transaction: any = await contractWithSigner.craftTiles(ids);

    return EthersApi.waitForTransaction(transaction.hash, 'polygon').then((response: any) => {
      return Boolean(response.status);
    });
  }

  public static getAllTiles(): Promise<any> {
    return tilesContract
      .getTileTypes([])
      .then((response: any) => {
        const modified = _.cloneDeep(response);

        response.forEach(
          (tile, index) =>
            // ! Modify BigNumber`s => number`s
            (modified[index][TileTypes.AlchemicaCost] = tile.alchemicaCost.map((alchemica) => {
              return parseInt(ethers.utils.formatUnits(alchemica));
            }))
        );

        return modified;
      })
      .catch((error) => console.log(error));
  }
}
