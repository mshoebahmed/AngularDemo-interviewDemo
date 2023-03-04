import { Component, OnInit } from '@angular/core';
import { AppointmentService, IDatePicker } from './service/appointment.service';
import { Observable } from 'rxjs';
import { IAppointment } from './service/appointment.service';
import { IDatePickerItem } from './service/appointment.service';
import { IDatePickerSlot } from './service/appointment.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /** Appointment service**
This service should return appointments for a date picker in the frontend.
Appointments will be loaded from another* backend system which is mocked for this exercise.


** There are two appointment durations:* -
half day (4 hours). Half day appointments can be in the morning (finishing before 1 PM)
 or in the afternoon* (beginning after 12 PM (noon))*
 - full day (8 hours)


** Business rules:*
This service should return one single full day appointment or max two half day appointments (one in the morning,* one in the afternoon) per day.
This service should never return two half day appointment in the morning or two in* the afternoon.

** Hint:* Output can be checked in the frontend. Also the console output shows the parsed mocks.**/

  public datePicker: IDatePicker = {
    items: []
  };

  public ngOnInit(): void {
    const appointments = this.appointmentService.getAppointments();
    this.datePicker = this.appointmentService.convertToDatepicker(appointments);
    this.clear()


  }

  public appointments: IAppointment[] = this.appointmentService.getAppointments();

  public selectedDateAppointments: IDatePickerSlot[] = [];
  public FullDayAppointMents: IDatePickerSlot[] = [];
  public FNDayAppointMents: IDatePickerSlot[] = [];
  public ANDayAppointMents: IDatePickerSlot[] = [];

  public showAppointmens: any[] = [];
  currentSession: any;
  appointment: any;
  appointmentAN: any;
  appointmentFN: any;
  selectedDate: any;

  toStr = JSON.stringify;
  toObj = JSON.parse;

  getAppointments() {

   let  param: IDatePickerItem = this.toObj(this.selectedDate);

    let selectedDateArray:IDatePickerSlot[] = param.slots;
    this.clear();

    selectedDateArray.forEach((appointment) => {

          if (Number.parseInt(appointment.startTime.substring(0, 2)) < 12 && Number.parseInt(appointment.endTime.substring(0, 2)) - Number.parseInt(appointment.startTime.substring(0, 2)) == 4) {
            appointment.session = 'FN';
            this.FNDayAppointMents.push(appointment);
          }
          else if (Number.parseInt(appointment.startTime.substring(0, 2)) > 12 && Number.parseInt(appointment.endTime.substring(0, 2)) - Number.parseInt(appointment.startTime.substring(0, 2)) == 4) {
            appointment.session = 'AN';
            this.ANDayAppointMents.push(appointment);
          }
          else {
            appointment.session = 'FullDay';
            this.FullDayAppointMents.push(appointment);
          }

        this.selectedDateAppointments.push(appointment);

    })


  }

  selectedAppointment(param: any) {
    var arrayAfterSelect = this.selectedDateAppointments.filter(x => x.id == param);
    if (arrayAfterSelect[0].session) {
      this.currentSession[arrayAfterSelect[0].session] = true;
    }
    this.showAppointmens.push(arrayAfterSelect[0])
  }

  clear() {

     this.unselect()

      this.selectedDate = undefined;
      this.selectedDateAppointments = [];
      this.FullDayAppointMents = [];
      this.FNDayAppointMents = [];
      this.ANDayAppointMents = [];


  }

  unselect(){
    this.appointment = undefined;
    this.appointmentAN = undefined;
    this.appointmentFN = undefined;
    this.showAppointmens = [];
    

    this.currentSession = {
      FN: false,
      AN: false,
      FullDay: false
    }

  }




  constructor(public appointmentService: AppointmentService) {
  }

}
