import React from "react";
import { ReactStateDeclaration } from "@uirouter/react";

const Dashboard = () => {
  return <div>Dashboard</div>;
};

export const states: ReactStateDeclaration[] = [
  {
    url: "/dashboard",
    name: "dashboard",
    data: {
      title: "Dashboard",
      loggedIn: true,
    },
    component: Dashboard,
  },
];

// import React, { useEffect, useState } from "react";
// import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import SimpleCard from "../../components/Dashboard/cards";
// import {
//   Card,
//   Typography,
//   CircularProgress,
//   Paper,
//   Button,
// } from "@material-ui/core";
// import AppoinmentTable from "../../components/AppoinmentTable";
// import { AppointmentType } from "../../types";
// import { $crud } from "../../factories/CrudFactory";
// import classNames from "classnames";
// import {
//   ArrowRight,
//   Briefcase,
//   BookOpen,
//   FastForward,
//   UserCheck,
//   UserX,
//   Video,
//   Smile,
// } from "react-feather";
// import { $state } from "../../router";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//       padding: 5,
//     },
//     paper: {
//       padding: theme.spacing(2),
//       //   textAlign: 'center',
//       background: "F1EEE9",
//       color: theme.palette.text.secondary,
//     },
//   })
// );

// export function Dashboard() {
//   const [appointmentComplete, setAppointmentComplete] = useState<Number>(0);
//   const [appointmentUpcoming, setAppointmentUpcoming] = useState<Number>(0);
//   const [appointmentRejected, setAppointmentRejected] = useState<Number>(0);
//   const [loading, setLoading] = useState<Boolean>(false);
//   const [limit] = useState(5);
//   const [upcomingAppointments, setUpcomingAppointments] = useState<
//     AppointmentType[]
//   >([]);
//   const [upcomingAppointmentLoading, setUpcomingAppointmentLoading] =
//     useState<Boolean>(false);
//   const [completedAppointments, setCompletedAppointments] = useState<
//     AppointmentType[]
//   >([]);
//   const [rejectedAppointments, setRejectedAppointments] = useState<
//     AppointmentType[]
//   >([]);
//   const [completedAppointmentLoading, setCompletedAppointmentLoading] =
//     useState<Boolean>(false);
//   const [rejectedtedAppointmentLoading, setRejectedtedAppointmentLoading] =
//     useState<Boolean>(false);

//   const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//       root: {
//         flexGrow: 1,
//         padding: 5,
//       },
//       paper: {
//         padding: theme.spacing(2),
//         background: "F1EEE9",
//         color: theme.palette.text.secondary,
//       },
//     })
//   );

//   const classes = useStyles();

//   const getAppointmentData = async () => {
//     try {
//       setLoading(true);
//       let data = await $crud.get("appointments/count/thera", {});

//       let complete_appointment = data.data[0].complete_appointment;
//       let reject_appointment = data.data[0].reject_appointment;
//       let upcoming_appointment = data.data[0].upcoming_appointment;

//       if (complete_appointment.length > 0) {
//         setAppointmentComplete(complete_appointment[0].count);
//       } else {
//         setAppointmentComplete(0);
//       }

//       if (reject_appointment.length > 0) {
//         setAppointmentRejected(reject_appointment[0].count);
//       } else {
//         setAppointmentRejected(0);
//       }
//       if (upcoming_appointment.length > 0) {
//         setAppointmentUpcoming(upcoming_appointment[0].count);
//       } else {
//         setAppointmentUpcoming(0);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getAppointments = async (
//     params = {},
//     setLoading: (loading: Boolean) => void,
//     setResult: (result: AppointmentType[]) => void
//   ) => {
//     try {
//       setLoading(true);
//       const data = await $crud.post("appointments/list", params);
//       setResult(data.data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   let today = new Date().getTime();

//   useEffect(() => {
//     getAppointmentData();

//     getAppointments(
//       {
//         limit,
//         sort: { dateOfAppointment: -1 },
//         cond: {
//           status: "Approved",
//           dateOfAppointment: {
//             $gte: new Date().getTime(),
//           },
//         },
//       },
//       setUpcomingAppointmentLoading,
//       setUpcomingAppointments
//     );

//     getAppointments(
//       {
//         limit,
//         sort: { updatedAt: -1 },
//         cond: {
//           status: "Completed",
//         },
//       },
//       setCompletedAppointmentLoading,
//       setCompletedAppointments
//     );

//     getAppointments(
//       {
//         limit,
//         sort: { updatedAt: -1 },
//         cond: {
//           status: "Rejected",
//         },
//       },
//       setRejectedtedAppointmentLoading,
//       setRejectedAppointments
//     );
//   }, []);

//   const filterByExpiration = upcomingAppointments.filter((items) => {
//     let dateOfAppointment = new Date(items.dateOfAppointment).getTime();

//     return dateOfAppointment >= today;
//   });

//   const OpenTodaySession = async () => {
//     $state.go("today-session");
//   };

//   const OpenGoals = async () => {
//     $state.go("goals");
//   };

//   return (
//     <Grid className="p-3" container direction="column" wrap="nowrap">
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <Grid xs={12} container className="p-2-all border">
//             <Grid
//               component={Paper}
//               container
//               item
//               xs={12}
//               md={6}
//               className={classNames("p-2-all p-2 border")}
//             >
//               <Typography variant="h5" component={Grid} item xs>
//                 Today Sessions
//               </Typography>
//               <Grid container wrap={"nowrap"}>
//                 <Grid item xs={12} md={6} className={"p-2-all"}>
//                   <Briefcase color="green" size={100} />
//                 </Grid>
//                 <Grid
//                   item
//                   xs={12}
//                   md={6}
//                   className={"p-2-all"}
//                   alignContent={"center"}
//                 >
//                   <Button
//                     variant={"contained"}
//                     color={"primary"}
//                     onClick={OpenTodaySession}
//                   >
//                     View more
//                     <ArrowRight />
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Grid>

//             <Grid
//               component={Paper}
//               container
//               item
//               xs={12}
//               md={6}
//               className={classNames("p-2-all p-2 border")}
//             >
//               <Typography variant="h5" component={Grid} item xs>
//                 Goals
//               </Typography>
//               <Grid container wrap={"nowrap"}>
//                 <Grid item xs={12} md={6} className={"p-2-all"}>
//                   <Smile color="blue" size={100} />
//                 </Grid>
//                 <Grid
//                   item
//                   xs={12}
//                   md={6}
//                   className={"p-2-all"}
//                   alignContent={"center"}
//                 >
//                   <Button
//                     variant={"contained"}
//                     color={"primary"}
//                     onClick={OpenGoals}
//                   >
//                     View more
//                     <ArrowRight />
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>

//         <Grid item xs={12}>
//           <Card>
//             <Grid container className="p-2-all border" wrap="nowrap">
//               <Grid>
//                 <BookOpen color="green" size={18} />
//               </Grid>
//               <Typography variant="h6" component={Grid} item xs>
//                 Appointments
//               </Typography>
//             </Grid>

//             <Grid container spacing={2} className="p-3">
//               <Grid item xs={12} md={4}>
//                 <SimpleCard
//                   title="Upcoming"
//                   appointments={appointmentUpcoming}
//                   Titleicon={<FastForward color="orange" size={14} />}
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <SimpleCard
//                   title="Completed"
//                   appointments={appointmentComplete}
//                   Titleicon={<UserCheck color="green" size={14} />}
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <SimpleCard
//                   title="Rejected"
//                   appointments={appointmentRejected}
//                   Titleicon={<UserX color="red" size={14} />}
//                 />
//               </Grid>
//             </Grid>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Grid container spacing={2}>
//             {typeof filterByExpiration !== "undefined" &&
//             filterByExpiration.length > 0 ? (
//               <Grid item xs={12} md={12}>
//                 <Card>
//                   <Grid container className="p-2-all border" wrap="nowrap">
//                     <Grid>
//                       <FastForward color="orange" size={18} />
//                     </Grid>
//                     <Typography variant="h6" component={Grid} item xs>
//                       Upcoming Appointments
//                     </Typography>
//                   </Grid>

//                   {loading !== false ? (
//                     <Grid container item xs={12} justify="center">
//                       <CircularProgress />
//                     </Grid>
//                   ) : (
//                     <AppoinmentTable
//                       classes={classes}
//                       appointments={filterByExpiration}
//                     />
//                   )}
//                 </Card>
//               </Grid>
//             ) : (
//               <Grid></Grid>
//             )}

//             {typeof completedAppointments !== "undefined" &&
//             completedAppointments.length > 0 ? (
//               <Grid item xs={12} md={12}>
//                 <Card>
//                   <Grid container className="p-2-all border" wrap="nowrap">
//                     <Grid>
//                       <FastForward color="orange" size={18} />
//                     </Grid>
//                     <Typography variant="h6" component={Grid} item xs>
//                       Recently Completed Appointments
//                     </Typography>
//                   </Grid>
//                   {loading !== false ? (
//                     <Grid container item xs={12} justify="center">
//                       <CircularProgress />
//                     </Grid>
//                   ) : (
//                     <AppoinmentTable
//                       classes={classes}
//                       appointments={completedAppointments}
//                     />
//                   )}
//                 </Card>
//               </Grid>
//             ) : (
//               <Grid></Grid>
//             )}

//             {typeof rejectedAppointments !== "undefined" &&
//             rejectedAppointments.length > 0 ? (
//               <Grid item xs={12} md={12}>
//                 <Card>
//                   <Grid container className="p-2-all border" wrap="nowrap">
//                     <Grid>
//                       <FastForward color="orange" size={18} />
//                     </Grid>
//                     <Typography variant="h6" component={Grid} item xs>
//                       Rejected Appointments
//                     </Typography>
//                   </Grid>
//                   {loading !== false ? (
//                     <Grid container item xs={12} justify="center">
//                       <CircularProgress />
//                     </Grid>
//                   ) : (
//                     <AppoinmentTable
//                       classes={classes}
//                       appointments={rejectedAppointments}
//                     />
//                   )}
//                 </Card>
//               </Grid>
//             ) : (
//               <Grid></Grid>
//             )}
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// }

// export const states: ReactStateDeclaration[] = [
//   {
//     url: "/dashboard",
//     name: "dashboard",
//     data: {
//       title: "Dashboard",
//       loggedIn: true,
//     },
//     component: Dashboard,
//   },
// ];
