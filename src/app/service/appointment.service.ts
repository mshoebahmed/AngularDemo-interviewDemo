import { logAppointment } from '../util/logging.util';

export interface IAppointment {
  id: number;
  start: string; // format YYYY-MM-DDTHH:mm:ss
  end: string; // format YYYY-MM-DDTHH:mm:ss
}

export interface IDatePickerSlot {
  id: number;
  startTime: string; // format HH:mm:ss
  endTime: string; // format HH:mm:ss
  session?: string
}

export interface IDatePickerItem {
  date: string; // format YYYY-MM-DD
  slots: IDatePickerSlot[];
}

export interface IDatePicker {
  items: IDatePickerItem[];
}

export class AppointmentService {

  public getAppointments(): IAppointment[] {
    console.log('Appointments are loaded');
    const mockedAppointments = [
      {
        id: 1234,
        "start": "2020-02-01T14:00:00",
        "end": "2020-02-01T18:00:00"
      },
      {
        id: 1235,
        "start": "2020-02-01T15:00:00",
        "end": "2020-02-01T19:00:00"
      },
      {
        id: 1236,
        "start": "2020-02-01T07:00:00",
        "end": "2020-02-01T11:00:00"
      },
      {
        id: 1237,
        "start": "2020-02-01T07:00:00",
        "end": "2020-02-01T15:00:00"
      },
      {
        id: 1238,
        "start": "2020-02-02T07:30:00",
        "end": "2020-02-02T15:30:00"
      },
      {
        id: 1239,
        "start": "2020-02-03T08:00:00",
        "end": "2020-02-03T12:00:00"
      },
      {
        id: 1240,
        "start": "2020-02-03T08:30:00",
        "end": "2020-02-03T12:30:00"
      },
      {
        id: 1241,
        "start": "2020-02-03T08:30:00",
        "end": "2020-02-03T16:30:00"
      },
      {
        id: 1242,
        "start": "2020-02-04T08:30:00",
        "end": "2020-02-04T16:30:00"
      },
      {
        id: 1243,
        "start": "2020-02-05T08:30:00",
        "end": "2020-02-05T12:30:00"
      },
      {
        id: 1244,
        "start": "2020-02-06T12:30:00",
        "end": "2020-02-06T16:30:00"
      },
      {
        id: 1245,
        "start": "2020-02-07T08:30:00",
        "end": "2020-02-07T12:30:00"
      },
      {
        id: 1246,
        "start": "2020-02-07T12:30:00",
        "end": "2020-02-07T16:30:00"
      }
    ];
    mockedAppointments.forEach(appointment => logAppointment(appointment));
    return mockedAppointments;
  }

  public convertToDatepicker(appointments: IAppointment[]): IDatePicker {


    let iDatePickerItem: IDatePickerItem[] = [];


    appointments.forEach((item: IAppointment) => {
      let iDatePickerSlot: IDatePickerSlot[] = [];

      var date = new Date(item.start).toISOString().slice(0, 10);
      var startTime=new Date(item.start).toISOString().slice(11,19);
      var endTime=new Date(item.end).toISOString().slice(11,19);
      var object = {
        id: item.id,
        startTime: startTime,
        endTime:endTime
      };
      let index = iDatePickerItem.findIndex(check =>
        check.date === date)


      if ((index) != -1) {
        iDatePickerItem[index].slots.push(object);

      } else {
        iDatePickerSlot.push(object)
        iDatePickerItem.push({
          date: date,
          slots: iDatePickerSlot
        })
      }
    })


    return {
      items: iDatePickerItem
    };
  }




}
