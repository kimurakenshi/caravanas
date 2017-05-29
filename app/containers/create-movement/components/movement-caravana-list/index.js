// import { connect } from 'react-redux';
// // import { removeCaravanaFromMovement } from 'app/actions/movement-actions';
// import React, { Component } from 'react';
// import PageSubtitle from 'app/components/page-subtitle';
// import styles from './style/movement-list.scss';
// import COMPANY_LIST_MODE from './enum';
// import {
//   Table,
//   TableBody,
//   TableHeader,
//   TableHeaderColumn,
//   TableRow,
//   TableRowColumn,
// } from 'material-ui/Table';
// import IconButton from 'material-ui/IconButton';
// import ActionRemove from 'material-ui/svg-icons/content/delete-sweep';
//
// class MovementCaravanaList extends Component {
//   render() {
//     return (
//       <div className={styles['movement-caravana-list']}>
//         <PageSubtitle title="Empresas" />
//
//         {this.props.companies.length === 0 && (
//           <p className={styles['movement-caravana-list-empty']} >
//             Crear una nueva empresa para poder associar caravanas y movimientos.
//           </p>
//         )}
//
//         {this.props.companies.length > 0 && (
//           <Table selectable={false}>
//             <TableHeader
//               adjustForCheckbox={false}
//               displaySelectAll={false}
//             >
//               <TableRow>
//                 <TableHeaderColumn>Número</TableHeaderColumn>
//                 <TableHeaderColumn>Eliminar</TableHeaderColumn>
//               </TableRow>
//             </TableHeader>
//             <TableBody displayRowCheckbox={false}>
//               {this.props.caravanas.map((caravana) => (
//                 <TableRow key={caravana.id}>
//                   <TableRowColumn>{caravana.number}</TableRowColumn>
//                   <TableRowColumn>
//                     <IconButton iconStyle={{ color: '#FF4081' }}>
//                       <ActionRemove />
//                     </IconButton>
//                   </TableRowColumn>
//                 </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         )}
//       </div>
//     );
//   }
// }
//
// function mapStateToProps(state) {
//
//
//   return {
//     activeCompanyId: settings.data.activeCompanyId,
//     companies: companyEntity.companies,
//     editCompanyId: companyEntity.editCompanyId,
//     viewMode: companyEntity.viewMode,
//   };
// }
//
// export default connect(
//   mapStateToProps,
//   {
//     fetchCompanies,
//     removeCompany,
//     saveSettings,
//     setListMode,
//   }
// )(MovementCaravanaList);
