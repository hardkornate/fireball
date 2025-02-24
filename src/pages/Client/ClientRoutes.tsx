import React, { useContext, useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';

import queryString from 'query-string';

import { EthersApi } from 'api';

// store
import * as fromDataReloadStore from 'core/store/data-reload';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { getActiveAddress, setActiveAddress } from 'core/store/login';

import { DataReloadType } from 'shared/constants';

import { ClientContext } from 'contexts/ClientContext';

import { PageNav } from 'components/PageNav/PageNav';
import { RealmSwitchButton } from 'components/RealmSwitchButton/RealmSwitchButton';

import { CommonUtils } from 'utils';

import { ClientAccount } from './routes/ClientAccount';
import { ClientFakeGotchis } from './routes/ClientFakeGotchis';
import { ClientForSale } from './routes/ClientForSale';
import { ClientGotchis } from './routes/ClientGotchis';
import { ClientInstallations } from './routes/ClientInstallations';
import { ClientPortals } from './routes/ClientPortals';
import { ClientRealm } from './routes/ClientRealm';
import { ClientTickets } from './routes/ClientTickets';
import { ClientWarehouse } from './routes/ClientWarehouse';
import { styles } from './styles';

const queryParamsOrder: string[] = ['haunt', 'collateral', 'search', 'sort', 'dir'];

export function ClientRoutes() {
  const classes = styles();

  const navigate = useNavigate();
  const location = useLocation();

  const subroute = location.pathname.split('/').slice(3).join('/');

  const { account } = useParams<{ account: string }>();
  const queryParams = queryString.parse(location.search);

  const dispatch = useAppDispatch();

  const lastManuallyTriggeredTimestamp: number = useAppSelector(fromDataReloadStore.getLastManuallyTriggeredTimestamp);
  const activeAddress = useAppSelector(getActiveAddress);

  const { getClientData, navData, realmView, canBeUpdated, setCanBeUpdated } = useContext<any>(ClientContext);

  const [isActiveAddressSet, setIsActiveAddressSet] = useState<boolean>(false);

  useEffect(() => {
    if (EthersApi.isEthAddress(account)) {
      dispatch(setActiveAddress(account));
    }

    dispatch(fromDataReloadStore.onSetReloadType(DataReloadType.Client));

    return () => {
      dispatch(fromDataReloadStore.onSetReloadType(null));
      setCanBeUpdated(false);
    };
  }, []);

  useEffect(() => {
    if (activeAddress) {
      if (activeAddress !== account && !isActiveAddressSet) {
        dispatch(setActiveAddress(account));
      } else {
        navigate({
          pathname: `/client/${activeAddress}${subroute ? `/${subroute}` : ''}`,
          search: queryString.stringify(queryParams, {
            sort: (a, b) => queryParamsOrder.indexOf(a) - queryParamsOrder.indexOf(b),
            arrayFormat: 'comma',
            encode: false
          })
        });

        getClientData(activeAddress, true);
      }

      setIsActiveAddressSet(true);
    }
  }, [activeAddress]);

  useEffect(() => {
    if (activeAddress && lastManuallyTriggeredTimestamp !== 0 && canBeUpdated) {
      getClientData(activeAddress);
    }
  }, [lastManuallyTriggeredTimestamp]);

  return (
    <>
      <Helmet>
        <title>
          {account ? `${CommonUtils.cutAddress(account, '..')} ${subroute ? subroute : 'client'}` : 'client'}
        </title>
      </Helmet>

      {EthersApi.isEthAddress(account) && (
        <div className={classes.routesNav}>
          <PageNav
            links={navData}
            // TODO should be shown in the future
            // beforeContent={(
            //     <Button
            //         to={account as string}
            //         className={classes.customBtn}
            //         component={NavLink}
            //     >
            //         <GameControllerIcon width={24} height={24} />
            //     </Button>
            // )}
            afterContent={
              <React.Fragment>
                {subroute.includes('realm') && <RealmSwitchButton view={realmView} navigate={navigate} />}
              </React.Fragment>
            }
          ></PageNav>
        </div>
      )}

      <Routes>
        <Route path='' element={<ClientAccount />} />
        <Route path='gotchis/*' element={<ClientGotchis />} />
        <Route path='portals' element={<ClientPortals />} />
        <Route path='installations' element={<ClientInstallations />} />
        <Route path='warehouse' element={<ClientWarehouse />} />
        <Route path='tickets' element={<ClientTickets />} />
        <Route path='realm/*' element={<ClientRealm />} />
        <Route path='fake-gotchis' element={<ClientFakeGotchis />} />
        <Route path='for-sale' element={<ClientForSale />} />
        <Route path='*' element={<Navigate to='gotchis' replace />} />
      </Routes>
    </>
  );
}
