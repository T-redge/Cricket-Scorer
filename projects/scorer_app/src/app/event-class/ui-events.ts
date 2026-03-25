export type UiEventType = {
  event: UiEvent,
  bool: boolean,
};

export enum UiEvent {
  ShowRunForm = "ShowRunForm",
  ShowExtraForm = "ShowExtraForm",
  ShowWicketForm = "ShowWicketForm",
  ShowSelectPlayerForm = "ShowSelectPlayerForm",
  ShowOpeningBatsForm = "ShowOpeningBatsForm",
  ShowTeamsUi = "ShowTeamsUi",
  ShowCoinTossUi = "ShowCoinTossUi",
  ShowRoleSelectionUi = "ShowRoleSelectionUi",
  ShowButtonUi = "ShowButtonUi",
  ShowEndOverUi = "ShowEndOverUi",
  ShowEndInningUi = "ShowEndInningUi",
  ShowEndMatchUi = "ShowEndMatchUi",
}
