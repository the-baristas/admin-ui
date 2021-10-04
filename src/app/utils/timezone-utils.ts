import * as moment from "moment";
import * as airportTimezone from 'airport-tz-ts'


export class TimezoneUtils {

  public static changeToLocalTime(time: string, airportCode: string) {
    let gmtOffset: any = new airportTimezone.AirportTzTs(airportCode).airport?.time.gmt;
    let timeLocalMoment: moment.Moment = moment(time).utcOffset(gmtOffset);
    return timeLocalMoment;
  }
}
