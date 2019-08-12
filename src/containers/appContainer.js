import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Switch } from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";

// Middleware
import requiresAuth from '../helpers/requiresAuth';

// Navigation
import NavigationContainer from './navigation/navigationContainer';
import NotFound404Container from './navigation/notFound404Container';

// General
import PrivacyContainer from './general/privacyContainer';
import HelpContainer from './general/helpContainer';
import TermsContainer from './general/termsContainer';

// Account
import LoginContainer from "./account/loginContainer";
import LogoutContainer from "./account/logoutContainer";

// Organizations
import SharedOrganizationListContainer from "./organization/shared/sharedOrganizationListContainer";
import SharedOrganizationCreateContainer from "./organization/shared/sharedOrganizationCreateContainer";

// Dashboard
import TenantDashboardRedirectContainer from "./dashboard/tenantDashboardRedirectContainer";
import DashboardContainer from "./dashboard/dashboardContainer";

// Client
import ClientListContainer from "./clients/list/clientListContainer";
import ClientSearchContainer from "./clients/search/clientSearchContainer";
import ClientSearchResultContainer from "./clients/search/clientSearchResultContainer";
import ClientLiteRetrieveContainer from "./clients/retrieve/clientLiteRetrieveContainer";
import ClientFullRetrieveContainer from "./clients/retrieve/clientFullRetrieveContainer";
import ClientOrderListContainer from "./clients/retrieve/clientOrderListContainer";
import ClientCommentContainer from "./clients/retrieve/clientCommentContainer";
import ClientCreateStep1Container from "./clients/create/clientCreateStep1Container";
import ClientCreateStep2Container from "./clients/create/clientCreateStep2Container";
import ClientCreateStep3Container from "./clients/create/clientCreateStep3Container";
import ClientCreateStep4BizContainer from "./clients/create/clientCreateStep4BizContainer";
import ClientCreateStep4RezContainer from "./clients/create/clientCreateStep4RezContainer";
import ClientCreateStep5Container from "./clients/create/clientCreateStep5Container";
import ClientCreateStep6Container from "./clients/create/clientCreateStep6Container";
import ClientCreateStep7Container from "./clients/create/clientCreateStep7Container";
import ClientUpdateContainer from "./clients/update/clientUpdateContainer";
import ClientActivateOperationContainer from "./clients/operations/clientActivateOperationContainer";
import ClientDeactivateOperationContainer from "./clients/operations/clientDeactivateOperationContainer";
import ClientRezUpgradeOperationContainer from "./clients/operations/clientRezUpgradeOperationContainer";
import ClientPermanentDeleteOperationContainer from "./clients/operations/clientPermanentDeleteOperationContainer";

// Associate
import AssociateListContainer from "./associates/list/associateListContainer";
import AssociateSearchContainer from "./associates/search/associateSearchContainer";
import AssociateSearchResultContainer from "./associates/search/associateSearchResultContainer";
import AssociateLiteRetrieveContainer from "./associates/retrieve/associateLiteRetrieveContainer";
import AssociateFullRetrieveContainer from "./associates/retrieve/associateFullRetrieveContainer";
import AssociateOrderListContainer from "./associates/retrieve/associateOrderListContainer";
import AssociateActivitySheetListContainer from "./associates/retrieve/associateActivitySheetListContainer";
import AssociateCommentContainer from "./associates/retrieve/associateCommentContainer";
import AssociateCreateStep1Container from "./associates/create/associateCreateStep1Container";
import AssociateCreateStep2Container from "./associates/create/associateCreateStep2Container";
import AssociateCreateStep3Container from "./associates/create/associateCreateStep3Container";
import AssociateCreateStep4BizContainer from "./associates/create/associateCreateStep4BizContainer";
import AssociateCreateStep4RezContainer from "./associates/create/associateCreateStep4RezContainer";
import AssociateCreateStep5Container from "./associates/create/associateCreateStep5Container";
import AssociateCreateStep6Container from "./associates/create/associateCreateStep6Container";
import AssociateCreateStep7Container from "./associates/create/associateCreateStep7Container";
import AssociateCreateStep8Container from "./associates/create/associateCreateStep8Container";
import AssociateUpdateContainer from "./associates/update/associateUpdateContainer";

// Work Order
import OrderListContainer from "./orders/list/orderListContainer";
import OrderSearchContainer from "./orders/search/orderSearchContainer";
import OrderSearchResultContainer from "./orders/search/orderSearchResultContainer";
import OrderLiteRetrieveContainer from "./orders/retrieve/orderLiteRetrieveContainer";
import OrderFullRetrieveContainer from "./orders/retrieve/orderFullRetrieveContainer";
import OrderCreateStep1Container from "./orders/create/orderCreateStep1Container";
import OrderCreateStep2Container from "./orders/create/orderCreateStep2Container";
import OrderCreateStep3Container from "./orders/create/orderCreateStep3Container";
import OrderCreateStep4Container from "./orders/create/orderCreateStep4Container";
import OrderCreateStep5Container from "./orders/create/orderCreateStep5Container";
import OrderCreateStep6Container from "./orders/create/orderCreateStep6Container";
import OrderUpdateContainer from "./orders/update/orderUpdateContainer";

// Tasks
import TaskListContainer from "./tasks/list/taskListContainer";
import TaskSearchContainer from "./tasks/search/taskSearchContainer";
import TaskSearchResultContainer from "./tasks/search/taskSearchResultContainer";
import AssignWatchAssociateTaskStep1Container from "./tasks/assignWatchAssociate/assignWatchAssociateTaskStep1Container";
import AssignWatchAssociateTaskStep2Container from "./tasks/assignWatchAssociate/assignWatchAssociateTaskStep2Container";
import AssignWatchAssociateTaskStep3Container from "./tasks/assignWatchAssociate/assignWatchAssociateTaskStep3Container";
import AssignWatchAreaCoordinatorTaskStep1Container from "./tasks/assignWatchAreaCoordinator/assignWatchAreaCoordinatorTaskStep1Container";
import AssignWatchAreaCoordinatorTaskStep2Container from "./tasks/assignWatchAreaCoordinator/assignWatchAreaCoordinatorTaskStep2Container";
import AssignWatchAreaCoordinatorTaskStep3Container from "./tasks/assignWatchAreaCoordinator/assignWatchAreaCoordinatorTaskStep3Container";

// Staff
import StaffListContainer from "./staff/list/staffListContainer";
import StaffSearchContainer from "./staff/staffSearchContainer";
import StaffSearchResultContainer from "./staff/staffSearchResultContainer";
import StaffUpdateContainer from "./staff/update/staffUpdateContainer";
import StaffFullRetrieveContainer from "./staff/retrieve/staffFullRetrieveContainer";
import StaffLiteRetrieveContainer from "./staff/retrieve/staffLiteRetrieveContainer";
import StaffCreateStep1Container from "./staff/create/staffCreateStep1Container";
import StaffCreateStep2Container from "./staff/create/staffCreateStep2Container";
import StaffCreateStep3Container from "./staff/create/staffCreateStep3Container";
import StaffCreateStep4Container from "./staff/create/staffCreateStep4Container";
import StaffCreateStep5Container from "./staff/create/staffCreateStep5Container";
import StaffCreateStep6Container from "./staff/create/staffCreateStep6Container";
import StaffCreateStep7Container from "./staff/create/staffCreateStep7Container";
import StaffCreateStep8Container from "./staff/create/staffCreateStep8Container";

// Reports
import ReportListContainer from "./reports/reportListContainer";

// Financials
import FinancialListContainer from "./financials/list/financialListContainer";
import FinancialRetrieveContainer from "./financials/retrieve/financialRetrieveContainer";

// Settings
import SettingListContainer from "./settings/settingListContainer";

import TagsListContainer from "./settings/tags/list/tagListContainer";
import TagDeleteContainer from "./settings/tags/tagDeleteContainer";
import TagCreateContainer from "./settings/tags/create/tagCreateContainer";
import TagUpdateContainer from "./settings/tags/tagUpdateContainer";

import HowHearsListContainer from "./settings/howHears/list/howHearListContainer";
import HowHearDeleteContainer from "./settings/howHears/howHearDeleteContainer";
import HowHearCreateContainer from "./settings/howHears/create/howHearCreateContainer";
import HowHearUpdateContainer from "./settings/howHears/howHearUpdateContainer";

import AwayLogListContainer from "./settings/awayLogs/list/awayLogListContainer";
import AwayLogDeleteContainer from "./settings/awayLogs/awayLogDeleteContainer";
import AwayLogCreateContainer from "./settings/awayLogs/create/awayLogCreateContainer";
import AwayLogUpdateContainer from "./settings/awayLogs/awayLogUpdateContainer";

import ResourcesListContainer from "./settings/resources/list/resourceListContainer";
import ResourceDeleteContainer from "./settings/resources/resourceDeleteContainer";
import ResourceCreateContainer from "./settings/resources/resourceCreateContainer";
import ResourceUpdateContainer from "./settings/resources/resourceUpdateContainer";

import BulletinBoardItemsListContainer from "./settings/bulletinBoardItems/list/bulletinBoardItemListContainer";
import BulletinBoardItemDeleteContainer from "./settings/bulletinBoardItems/bulletinBoardItemDeleteContainer";
import BulletinBoardItemCreateContainer from "./settings/bulletinBoardItems/create/bulletinBoardItemCreateContainer";
import BulletinBoardItemUpdateContainer from "./settings/bulletinBoardItems/bulletinBoardItemUpdateContainer";

import SkillSetsListContainer from "./settings/skillSets/list/skillSetListContainer";
import SkillSetDeleteContainer from "./settings/skillSets/skillSetDeleteContainer";
import SkillSetCreateContainer from "./settings/skillSets/create/skillSetCreateContainer";
import SkillSetUpdateContainer from "./settings/skillSets/skillSetUpdateContainer";

import InsuranceRequirementsListContainer from "./settings/insuranceRequirements/list/insuranceRequirementListContainer";
import InsuranceRequirementDeleteContainer from "./settings/insuranceRequirements/insuranceRequirementDeleteContainer";
import InsuranceRequirementCreateContainer from "./settings/insuranceRequirements/create/insuranceRequirementCreateContainer";
import InsuranceRequirementUpdateContainer from "./settings/insuranceRequirements/insuranceRequirementUpdateContainer";

import ServiceFeesListContainer from "./settings/serviceFees/list/serviceFeeListContainer";
import ServiceFeeDeleteContainer from "./settings/serviceFees/serviceFeeDeleteContainer";
import ServiceFeeCreateContainer from "./settings/serviceFees/create/serviceFeeCreateContainer";
import ServiceFeeUpdateContainer from "./settings/serviceFees/serviceFeeUpdateContainer";

import DeactivatedClientListContainer from "./settings/deactivatedClients/list/deactivatedClientListContainer";

import VehicleTypesListContainer from "./settings/vehicleTypes/list/vehicleTypeListContainer";
import VehicleTypeDeleteContainer from "./settings/vehicleTypes/vehicleTypeDeleteContainer";
import VehicleTypeCreateContainer from "./settings/vehicleTypes/create/vehicleTypeCreateContainer";
import VehicleTypeUpdateContainer from "./settings/vehicleTypes/vehicleTypeUpdateContainer";


// Partner
import PartnerListContainer from "./partners/list/partnerListContainer";
import PartnerSearchContainer from "./partners/search/partnerSearchContainer";
import PartnerSearchResultContainer from "./partners/search/partnerSearchResultContainer";
import PartnerLiteRetrieveContainer from "./partners/retrieve/partnerLiteRetrieveContainer";
import PartnerFullRetrieveContainer from "./partners/retrieve/partnerFullRetrieveContainer";
import PartnerCreateStep1Container from "./partners/create/partnerCreateStep1Container";
import PartnerCreateStep2Container from "./partners/create/partnerCreateStep2Container";
import PartnerCreateStep3Container from "./partners/create/partnerCreateStep3Container";
import PartnerCreateStep4Container from "./partners/create/partnerCreateStep4Container";
import PartnerCreateStep5Container from "./partners/create/partnerCreateStep5Container";
import PartnerCreateStep6Container from "./partners/create/partnerCreateStep6Container";
import PartnerUpdateContainer from "./partners/update/partnerUpdateContainer";


class AppContainer extends React.Component {
    render() {
        return (
            <Router>
                <div className="container-fluid" id="outer-container">

                    <NavigationContainer
                        history={this.props.history}
                        location={this.props.location}
                        match={this.props.match}
                        staticContext={this.props.staticContext}
                    />

                    <div className="d-flex align-items-stretch">
                        <main id="main" role="main">
                            <ScrollUpButton />
                            <Switch>
                                { /* ACCOUNT + GENERAL */}
                                <Route path="/" exact component={LoginContainer} />
                                <Route path="/privacy" exact component={PrivacyContainer} />
                                <Route path="/terms" exact component={TermsContainer} />
                                <Route path="/help" exact component={HelpContainer} />
                                <Route path="/login" exact component={LoginContainer} />
                                <Route path="/logout" exact component={LogoutContainer} />
                                <Route path="/organizations" exact component={requiresAuth(SharedOrganizationListContainer)} />
                                <Route path="/organization/add" exact component={requiresAuth(SharedOrganizationCreateContainer)} />
                                <Route path="/dashboard-redirect/:accessToken/:refreshToken" exact component={TenantDashboardRedirectContainer} />
                                <Route path="/dashboard" exact component={requiresAuth(DashboardContainer)} />

                                { /* CLIENTS */ }
                                <Route path="/clients/add/step-1" exact component={requiresAuth(ClientCreateStep1Container)} />
                                <Route path="/clients/add/step-2" exact component={requiresAuth(ClientCreateStep2Container)} />
                                <Route path="/clients/add/step-3" exact component={requiresAuth(ClientCreateStep3Container)} />
                                <Route path="/clients/add/step-4-biz" exact component={requiresAuth(ClientCreateStep4BizContainer)} />
                                <Route path="/clients/add/step-4-rez-or-cc" exact component={requiresAuth(ClientCreateStep4RezContainer)} />
                                <Route path="/clients/add/step-5" exact component={requiresAuth(ClientCreateStep5Container)} />
                                <Route path="/clients/add/step-6" exact component={requiresAuth(ClientCreateStep6Container)} />
                                <Route path="/clients/add/step-7" exact component={requiresAuth(ClientCreateStep7Container)} />
                                <Route path="/clients" exact component={requiresAuth(ClientListContainer)} />
                                <Route path="/clients/search" exact component={requiresAuth(ClientSearchContainer)} />
                                <Route path="/clients/search-results" exact component={requiresAuth(ClientSearchResultContainer)} />
                                <Route path="/client/:id" exact component={requiresAuth(ClientLiteRetrieveContainer)} />
                                <Route path="/client/:id/full" exact component={requiresAuth(ClientFullRetrieveContainer)} />
                                <Route path="/client/:id/orders" exact component={requiresAuth(ClientOrderListContainer)} />
                                <Route path="/client/:id/comments" exact component={requiresAuth(ClientCommentContainer)} />
                                <Route path="/client/:id/update" exact component={requiresAuth(ClientUpdateContainer)} />
                                <Route path="/client/:id/activation" exact component={requiresAuth(ClientActivateOperationContainer)} />
                                <Route path="/client/:id/deactivation" exact component={requiresAuth(ClientDeactivateOperationContainer)} />
                                <Route path="/client/:id/delete" exact component={requiresAuth(ClientPermanentDeleteOperationContainer)} />
                                <Route path="/client/:id/rez-upgrade" exact component={requiresAuth(ClientRezUpgradeOperationContainer)} />


                                { /* ASSOCIATES */ }
                                <Route path="/associates/add/step-1" exact component={requiresAuth(AssociateCreateStep1Container)} />
                                <Route path="/associates/add/step-2" exact component={requiresAuth(AssociateCreateStep2Container)} />
                                <Route path="/associates/add/step-3" exact component={requiresAuth(AssociateCreateStep3Container)} />
                                <Route path="/associates/add/step-4-biz" exact component={requiresAuth(AssociateCreateStep4BizContainer)} />
                                <Route path="/associates/add/step-4-rez-or-cc" exact component={requiresAuth(AssociateCreateStep4RezContainer)} />
                                <Route path="/associates/add/step-5" exact component={requiresAuth(AssociateCreateStep5Container)} />
                                <Route path="/associates/add/step-6" exact component={requiresAuth(AssociateCreateStep6Container)} />
                                <Route path="/associates/add/step-7" exact component={requiresAuth(AssociateCreateStep7Container)} />
                                <Route path="/associates/add/step-8" exact component={requiresAuth(AssociateCreateStep8Container)} />
                                <Route path="/associates" exact component={requiresAuth(AssociateListContainer)} />
                                <Route path="/associates/search" exact component={requiresAuth(AssociateSearchContainer)} />
                                <Route path="/associates/search-results" exact component={requiresAuth(AssociateSearchResultContainer)} />
                                <Route path="/associate/:id" exact component={requiresAuth(AssociateLiteRetrieveContainer)} />
                                <Route path="/associate/:id/full" exact component={requiresAuth(AssociateFullRetrieveContainer)} />
                                <Route path="/associate/:id/orders" exact component={requiresAuth(AssociateOrderListContainer)} />
                                <Route path="/associate/:id/comments" exact component={requiresAuth(AssociateCommentContainer)} />
                                <Route path="/associate/:id/activity-sheets" exact component={requiresAuth(AssociateActivitySheetListContainer)} />
                                <Route path="/associate/:id/update" exact component={requiresAuth(AssociateUpdateContainer)} />

                                { /* WORK ORDER */}
                                <Route path="/orders/add/step-1" exact component={requiresAuth(OrderCreateStep1Container)} />
                                <Route path="/orders/add/step-2" exact component={requiresAuth(OrderCreateStep2Container)} />
                                <Route path="/orders/add/step-3" exact component={requiresAuth(OrderCreateStep3Container)} />
                                <Route path="/orders/add/step-4" exact component={requiresAuth(OrderCreateStep4Container)} />
                                <Route path="/orders/add/step-5" exact component={requiresAuth(OrderCreateStep5Container)} />
                                <Route path="/orders/add/step-6" exact component={requiresAuth(OrderCreateStep6Container)} />
                                <Route path="/orders" exact component={requiresAuth(OrderListContainer)} />
                                <Route path="/orders/search" exact component={requiresAuth(OrderSearchContainer)} />
                                <Route path="/orders/search-results" exact component={requiresAuth(OrderSearchResultContainer)} />
                                <Route path="/order/:id" exact component={requiresAuth(OrderLiteRetrieveContainer)} />
                                <Route path="/order/:id/full" exact component={requiresAuth(OrderFullRetrieveContainer)} />
                                <Route path="/order/:id/update" exact component={requiresAuth(OrderUpdateContainer)} />

                                { /* TASKS */ }
                                <Route path="/tasks" exact component={requiresAuth(TaskListContainer)} />
                                <Route path="/tasks/search" exact component={requiresAuth(TaskSearchContainer)} />
                                <Route path="/tasks/search-results" exact component={requiresAuth(TaskSearchResultContainer)} />
                                <Route path="/task/1/:id/step-1" exact component={requiresAuth(AssignWatchAssociateTaskStep1Container)} />
                                <Route path="/task/1/:id/step-2" exact component={requiresAuth(AssignWatchAssociateTaskStep2Container)} />
                                <Route path="/task/1/:id/step-3" exact component={requiresAuth(AssignWatchAssociateTaskStep3Container)} />
                                <Route path="/task/2/:id/step-1" exact component={requiresAuth(AssignWatchAreaCoordinatorTaskStep1Container)} />
                                <Route path="/task/2/:id/step-2" exact component={requiresAuth(AssignWatchAreaCoordinatorTaskStep2Container)} />
                                <Route path="/task/2/:id/step-3" exact component={requiresAuth(AssignWatchAreaCoordinatorTaskStep3Container)} />

                                { /* STAFF */ }
                                <Route path="/staff/add/step-1" exact component={requiresAuth(StaffCreateStep1Container)} />
                                <Route path="/staff/add/step-2" exact component={requiresAuth(StaffCreateStep2Container)} />
                                <Route path="/staff/add/step-3" exact component={requiresAuth(StaffCreateStep3Container)} />
                                <Route path="/staff/add/step-4" exact component={requiresAuth(StaffCreateStep4Container)} />
                                <Route path="/staff/add/step-5" exact component={requiresAuth(StaffCreateStep5Container)} />
                                <Route path="/staff/add/step-6" exact component={requiresAuth(StaffCreateStep6Container)} />
                                <Route path="/staff/add/step-7" exact component={requiresAuth(StaffCreateStep7Container)} />
                                <Route path="/staff/add/step-8" exact component={requiresAuth(StaffCreateStep8Container)} />
                                <Route path="/staff" exact component={requiresAuth(StaffListContainer)} />
                                <Route path="/staff/search" exact component={requiresAuth(StaffSearchContainer)} />
                                <Route path="/staff/search-results" exact component={requiresAuth(StaffSearchResultContainer)} />
                                <Route path="/staff/:id" exact component={requiresAuth(StaffLiteRetrieveContainer)} />
                                <Route path="/staff/:id/full" exact component={requiresAuth(StaffFullRetrieveContainer)} />
                                <Route path="/staff/:id/update" exact component={requiresAuth(StaffUpdateContainer)} />

                                { /* REPORTS */ }
                                <Route path="/reports" exact component={requiresAuth(ReportListContainer)} />

                                { /* FINANCIALS */ }
                                <Route path="/financials" exact component={requiresAuth(FinancialListContainer)} />
                                <Route path="/financial/:id" exact component={requiresAuth(FinancialRetrieveContainer)} />

                                { /* SETTINGS */ }
                                <Route path="/settings" exact component={requiresAuth(SettingListContainer)} />
                                <Route path="/settings/tags" exact component={requiresAuth(TagsListContainer)} />
                                <Route path="/settings/tag/add" exact component={requiresAuth(TagCreateContainer)} />
                                <Route path="/settings/tag/:id/delete" exact component={requiresAuth(TagDeleteContainer)} />
                                <Route path="/settings/tag/:id/update" exact component={requiresAuth(TagUpdateContainer)} />
                                <Route path="/settings/how-hears" exact component={requiresAuth(HowHearsListContainer)} />
                                <Route path="/settings/how-hears/add" exact component={requiresAuth(HowHearCreateContainer)} />
                                <Route path="/settings/how-hear/:id/delete" exact component={requiresAuth(HowHearDeleteContainer)} />
                                <Route path="/settings/how-hear/:id/update" exact component={requiresAuth(HowHearUpdateContainer)} />
                                <Route path="/settings/away-logs" exact component={requiresAuth(AwayLogListContainer)} />
                                <Route path="/settings/away-logs/add" exact component={requiresAuth(AwayLogCreateContainer)} />
                                <Route path="/settings/away-log/:id/delete" exact component={requiresAuth(AwayLogDeleteContainer)} />
                                <Route path="/settings/away-log/:id/update" exact component={requiresAuth(AwayLogUpdateContainer)} />
                                <Route path="/settings/resources" exact component={requiresAuth(ResourcesListContainer)} />
                                <Route path="/settings/resource/add" exact component={requiresAuth(ResourceCreateContainer)} />
                                <Route path="/settings/resource/:id/delete" exact component={requiresAuth(ResourceDeleteContainer)} />
                                <Route path="/settings/resource/:id/update" exact component={requiresAuth(ResourceUpdateContainer)} />
                                <Route path="/settings/bulletin-board-items" exact component={requiresAuth(BulletinBoardItemsListContainer)} />
                                <Route path="/settings/bulletin-board-items/add" exact component={requiresAuth(BulletinBoardItemCreateContainer)} />
                                <Route path="/settings/bulletin-board-item/:id/delete" exact component={requiresAuth(BulletinBoardItemDeleteContainer)} />
                                <Route path="/settings/bulletin-board-item/:id/update" exact component={requiresAuth(BulletinBoardItemUpdateContainer)} />
                                <Route path="/settings/skill-sets" exact component={requiresAuth(SkillSetsListContainer)} />
                                <Route path="/settings/skill-sets/add" exact component={requiresAuth(SkillSetCreateContainer)} />
                                <Route path="/settings/skill-set/:id/delete" exact component={requiresAuth(SkillSetDeleteContainer)} />
                                <Route path="/settings/skill-set/:id/update" exact component={requiresAuth(SkillSetUpdateContainer)} />
                                <Route path="/settings/insurance-requirements" exact component={requiresAuth(InsuranceRequirementsListContainer)} />
                                <Route path="/settings/insurance-requirement/add" exact component={requiresAuth(InsuranceRequirementCreateContainer)} />
                                <Route path="/settings/insurance-requirement/:id/delete" exact component={requiresAuth(InsuranceRequirementDeleteContainer)} />
                                <Route path="/settings/insurance-requirement/:id/update" exact component={requiresAuth(InsuranceRequirementUpdateContainer)} />
                                <Route path="/settings/service-fees" exact component={requiresAuth(ServiceFeesListContainer)} />
                                <Route path="/settings/service-fee/add" exact component={requiresAuth(ServiceFeeCreateContainer)} />
                                <Route path="/settings/service-fee/:id/delete" exact component={requiresAuth(ServiceFeeDeleteContainer)} />
                                <Route path="/settings/service-fee/:id/update" exact component={requiresAuth(ServiceFeeUpdateContainer)} />
                                <Route path="/settings/deactivated-clients" exact component={requiresAuth(DeactivatedClientListContainer)} />
                                <Route path="/settings/vehicle-types" exact component={requiresAuth(VehicleTypesListContainer)} />
                                <Route path="/settings/vehicle-type/add" exact component={requiresAuth(VehicleTypeCreateContainer)} />
                                <Route path="/settings/vehicle-type/:id/delete" exact component={requiresAuth(VehicleTypeDeleteContainer)} />
                                <Route path="/settings/vehicle-type/:id/update" exact component={requiresAuth(VehicleTypeUpdateContainer)} />

                                { /* PARTNERS */ }
                                <Route path="/partners/add/step-1" exact component={requiresAuth(PartnerCreateStep1Container)} />
                                <Route path="/partners/add/step-2" exact component={requiresAuth(PartnerCreateStep2Container)} />
                                <Route path="/partners/add/step-3" exact component={requiresAuth(PartnerCreateStep3Container)} />
                                <Route path="/partners/add/step-4" exact component={requiresAuth(PartnerCreateStep4Container)} />
                                <Route path="/partners/add/step-5" exact component={requiresAuth(PartnerCreateStep5Container)} />
                                <Route path="/partners/add/step-6" exact component={requiresAuth(PartnerCreateStep6Container)} />
                                <Route path="/partners" exact component={requiresAuth(PartnerListContainer)} />
                                <Route path="/partners/search" exact component={requiresAuth(PartnerSearchContainer)} />
                                <Route path="/partners/search-results" exact component={requiresAuth(PartnerSearchResultContainer)} />
                                <Route path="/partner/:id" exact component={requiresAuth(PartnerLiteRetrieveContainer)} />
                                <Route path="/partner/:id/full" exact component={requiresAuth(PartnerFullRetrieveContainer)} />
                                <Route path="/partner/:id/update" exact component={requiresAuth(PartnerUpdateContainer)} />

                                { /* EVERYTHING ELSE... */ }
                                <Route component={NotFound404Container} />
                            </Switch>
                        </main>
                    </div>
                </div>
            </Router>
        );
    }
}

export default withRouter(AppContainer);
