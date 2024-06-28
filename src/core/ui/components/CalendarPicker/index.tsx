'use client';

import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isSaturday,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import Image from 'next/image';
import { ReactNode, useState } from 'react';
import EventAction from './EventAction';

interface CalendarPickerProps {
  customElement?: boolean;
  children?: ReactNode;
  onDateSelect: (date: Date) => void;
}

interface MeetingType {
  id: number;
  name: string;
  imageUrl: string;
  startDatetime: string;
  endDatetime: string;
  noOfPerson: number;
}

const meetings: MeetingType[] = [
  {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-05-11T13:00',
    endDatetime: '2024-05-11T14:30',
    noOfPerson: 3,
  },
  {
    id: 2,
    name: 'Michael Foster',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-06-20T09:00',
    endDatetime: '2024-06-20T11:30',
    noOfPerson: 3,
  },
  {
    id: 3,
    name: 'Dries Vincent',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-06-20T17:00',
    endDatetime: '2024-06-20T18:30',
    noOfPerson: 5,
  },
  {
    id: 4,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-07-09T13:00',
    endDatetime: '2024-07-09T14:30',
    noOfPerson: 1,
  },
  {
    id: 5,
    name: 'Michael Foster',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-07-13T14:00',
    endDatetime: '2024-07-13T14:30',
    noOfPerson: 2,
  },
];

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function CalendarPicker({
  customElement,
  children,
  onDateSelect,
}: CalendarPickerProps) {
  const [isOpen, toggleOpen] = useState<boolean>(false);
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState<Date>(today);
  let [currentMonth, setCurrentMonth] = useState<string>(
    format(today, 'MMM-yyyy')
  );
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPreviousMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  let selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), selectedDay)
  );

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
    onDateSelect(day);
    toggleOpen((prev) => !prev);
  };

  return (
    <div className="relative z-20">
      {customElement ? (
        <div onClick={() => toggleOpen((prev) => !prev)}>{children}</div>
      ) : (
        <button
          type="button"
          className="h-12 px-4 rounded bg-slate-700 text-gray-50"
        >
          Open
        </button>
      )}

      <div
        className={`absolute top-full left-0 w-max ${isOpen ? 'block' : 'hidden'}`}
      >
        <div className="w-11/12 max-w-xs px-2 sm:px-4 md:max-w-6xl md:px-6 pt-2 bg-white rounded">
          <div className="md:grid md:grid-cols-1 md:divide-x md:divide-gray-200">
            {/* <div className="md:pr-14"> */}
            <div className="">
              <div className="flex items-center">
                <h2 className="flex-auto font-semibold text-gray-900">
                  {format(firstDayCurrentMonth, 'MMMM yyyy')}
                </h2>
                <button
                  type="button"
                  onClick={previousMonth}
                  className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Previous month</span>
                  <ArrowLeft2 size="32" color="#FF8A65" variant="Bulk" />
                </button>
                <button
                  onClick={nextMonth}
                  type="button"
                  className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Next month</span>
                  <ArrowRight2 size="32" color="#FF8A65" variant="Bulk" />
                </button>
              </div>
              <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500 font-bold">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div className="text-red-500">S</div>
              </div>
              <div className="grid grid-cols-7 mt-2 text-sm font-light">
                {days.map((day, dayIdx) => (
                  <div
                    key={day.toString()}
                    className={classNames(
                      dayIdx === 0 ? colStartClasses[getDay(day)] : '',
                      'py-1.5'
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => handleDayClick(day)}
                      className={classNames(
                        isEqual(day, selectedDay) ? 'text-white' : '',
                        !isEqual(day, selectedDay) && isToday(day)
                          ? 'text-red-500'
                          : '',
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth)
                          ? 'text-gray-900'
                          : '',
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth)
                          ? 'text-gray-400'
                          : '',
                        isEqual(day, selectedDay) && isToday(day)
                          ? 'bg-red-500'
                          : '',
                        isEqual(day, selectedDay) && !isToday(day)
                          ? 'bg-gray-500'
                          : '',
                        !isEqual(day, selectedDay) ? 'hover:text-cyan-600' : '',
                        isEqual(day, selectedDay) || isToday(day)
                          ? 'font-semibold'
                          : '',
                        isSaturday(day) ? 'text-red-500' : '',
                        'mx-auto flex h-14 w-14 items-center justify-center rounded relative'
                      )}
                    >
                      <time dateTime={format(day, 'yyyy-MM-dd')}>
                        {format(day, 'd')}
                      </time>
                      {meetings.some((meeting) =>
                        isSameDay(parseISO(meeting.startDatetime), day)
                      ) && (
                        <div className="absolute bottom-1 left-1 right-1 bg-custom-blue text-xs font-medium text-custom-primary rounded">
                          2 left
                        </div>
                      )}
                    </button>

                    <div className="w-1 h-1 mx-auto mt-1">
                      {meetings.some((meeting) =>
                        isSameDay(parseISO(meeting.startDatetime), day)
                      ) && (
                        <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="font-semibold text-gray-900">
              Schedule for{' '}
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'MMM dd, yyyy')}
              </time>
            </h2>
            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
              {selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((meeting) => (
                  <Meeting meeting={meeting} key={meeting.id} />
                ))
              ) : (
                <p>No bookings yet</p>
              )}
            </ol>
          </section> */}
          </div>
        </div>
      </div>
    </div>
  );
}

interface MeetingProps {
  meeting: MeetingType;
}

function Booking({ meeting }: MeetingProps) {
  let startDateTime = parseISO(meeting.startDatetime);
  let endDateTime = parseISO(meeting.endDatetime);

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <div className="relative overflow-hidden">
        <Image
          src={meeting.imageUrl}
          alt="user image"
          width={100}
          height={100}
          className="flex-none w-10 h-10 rounded-full object-cover"
        />
      </div>
      <div className="flex-auto">
        <p className="text-gray-900">{meeting.name}</p>
        <p className="mt-0.5">
          <time dateTime={meeting.startDatetime}>
            {format(startDateTime, 'h:mm a')}
          </time>{' '}
          -{' '}
          <time dateTime={meeting.endDatetime}>
            {format(endDateTime, 'h:mm a')}
          </time>
        </p>
      </div>
      <EventAction />
    </li>
  );
}

let colStartClasses: string[] = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];
