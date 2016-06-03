import React from 'react';
import {Modal, Chrome} from '../../common/components';
import {FooterView} from '../../footer/views';
import {ViewBase} from '../../common';
import {ShellModel} from '../model';
import {router} from '../../../system';
import {WorkspaceRegionView} from '../../regions/views/workspace';
import {SingleItemRegionView} from '../../regions/views/singleItem';
import classnames from 'classnames';
import './shell.scss';


export default class ShellView extends ViewBase {
  constructor() {
    super();
    this.state = {
      model: null,
      modelId: 'shellModelId'
    };
  }

  render() {
    let model:ShellModel = this.state.model;
    if (model === null) {
      return null;
    }

    let mainAreaClasses = classnames('shell__main-area', {
      'shell__main-area--expanded': model.canExpandMainArea
    });

    let wellKnownModelIds = model.wellKnownModelIds;
    return (
      <Chrome>
        <div className='shell__container'>
          <div className='shell__splash'>
            <span className='shell__splash-message'>{model.appVersion}<br />Loading...</span>
          </div>
          <Modal shouldShow={model.sessionExpired} title='Session expired'>
            <div>
              <div>Your 15 minute session expired, you are now disconnected from the server.</div>
              <div>Click reconnect to start a new session.</div>
              <button className='btn shell__button--reconnect'
                      onClick={() => router.publishEvent(model.modelId, 'reconnectClicked', {})}>Reconnect
              </button>
            </div>
          </Modal>
          <div className={mainAreaClasses}>
            <WorkspaceRegionView className='shell__workspace' modelId={wellKnownModelIds.workspaceRegionModelId}/>
            <SingleItemRegionView className='shell__analytics' modelId={wellKnownModelIds.quickAccessRegionModelId}/>
            <SingleItemRegionView className='shell__side-bar' modelId={wellKnownModelIds.sidebarRegionModelId}/>
          </div>
          <SingleItemRegionView className='shell__blotter' modelId={wellKnownModelIds.blotterRegionModelId}/>
          <div className='shell__footer'>
            <FooterView modelId={wellKnownModelIds.footerModelId}/>
          </div>
        </div>
      </Chrome>
    );
  }
}
