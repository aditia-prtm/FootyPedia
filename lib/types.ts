export interface Player {
  idPlayer: string;
  strPlayer: string;
  strPlayerAlternate?: string;
  strNationality?: string;
  strTeam?: string;
  idTeam?: string;
  strSport?: string;
  dateBorn?: string;
  strBirthLocation?: string;
  strDescriptionEN?: string;
  strPosition?: string;
  strHeight?: string;
  strWeight?: string;
  strThumb?: string;
  strCutout?: string;
  strRender?: string;
  strBanner?: string;
  strFanart1?: string;
  strNumber?: string;
  strWage?: string;
  strSigning?: string;
  strStatus?: string;
  strGender?: string;
  strSide?: string;
}

export interface Team {
  idTeam: string;
  strTeam: string;
  strTeamAlternate?: string;
  strTeamShort?: string;
  intFormedYear?: string;
  strSport?: string;
  strLeague?: string;
  idLeague?: string;
  strStadium?: string;
  strStadiumLocation?: string;
  strStadiumCapacity?: string;
  strWebsite?: string;
  strFacebook?: string;
  strTwitter?: string;
  strInstagram?: string;
  strDescriptionEN?: string;
  strCountry?: string;
  strBadge?: string;
  strJersey?: string;
  strLogo?: string;
  strFanart1?: string;
  strBanner?: string;
}
