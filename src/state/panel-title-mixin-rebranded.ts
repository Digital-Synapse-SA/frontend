import { getPanelTitleFromUrlPath } from "../data/panel";
import type { Constructor, HomeAssistant } from "../types";
import type { HassBaseEl } from "./hass-base-mixin";

const setTitle = (title: string | undefined) => {
  document.title = title ? `${title} – Smartelligent Home` : "Smartelligent Home";
};

export const panelTitleMixin = <T extends Constructor<HassBaseEl>>(
  superClass: T
) =>
  class extends superClass {
    protected hassConnected() {
      super.hassConnected();
      this._updateTitle();
    }

    protected hassReconnected() {
      super.hassReconnected();
      this._updateTitle();
    }

    private _updateTitle() {
      const panelTitle = getPanelTitleFromUrlPath(
        this.hass!,
        this.routerOptions.urlPath
      );
      setTitle(panelTitle);
    }
  }; 