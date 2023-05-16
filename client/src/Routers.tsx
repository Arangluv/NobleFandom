import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Pages/Main";
import MainIndex from "./Pages/MainIndex";
import UserLogin from "./Pages/LoginPage/UserLogin";
import WithUs from "./Pages/LoginPage/WithUs";
import RegisterCreator from "./Pages/LoginPage/RegisterCreator";
import RegisterPartner from "./Pages/LoginPage/RegisterPartner";
import DailyRating from "./Pages/RatingPage/DailyRating";
import TotalRating from "./Pages/RatingPage/TotalRating";
import WeeklyRating from "./Pages/RatingPage/WeeklyRating";
import SearchInfluence from "./Pages/RatingPage/SearchInfluence";
import CardPost from "./Pages/RatingPage/CardPost";
import FeedMain from "./Pages/Feed/FeedMain";
import FeedHome from "./Pages/Feed/Share/FeedHome";
import Alarm from "./Pages/Feed/Share/Alarm";
import Chat from "./Pages/Feed/Share/Chat";
import Membership from "./Pages/Feed/Share/Membership";
import LikedFeed from "./Pages/Feed/Share/LikedFeed";
import Search from "./Pages/Feed/Share/Search";
import FeedSearchTotal from "./Components/FeedSearchTotal";
import FeedSearchWeek from "./Components/FeedSearchWeek";
import FeedSearchDay from "./Components/FeedSearchDay";
import FeedSearchPost from "./Components/FeedSearchPost";
import Setting from "./Pages/Feed/Share/Setting";
import Profile from "./Components/SettingPage/Profile";
import Account from "./Components/SettingPage/Account";
import BlockAccount from "./Components/SettingPage/BlockAccount";
import CreatorApply from "./Components/SettingPage/CreatorApply";
import PaymentMethod from "./Components/SettingPage/PaymentMethod";
import BillingHistory from "./Components/SettingPage/BillingHistory";
import ChangePassword from "./Components/SettingPage/ChangePassword";
import PersonalScreen from "./Pages/Feed/Share/PersonalScreen";
import CreatorFeed from "./Pages/Feed/Creator/CreatorFeed";
import UserRequestion from "./Pages/Feed/Creator/UserRequestion";
import OnlyCreatorSetting from "./Pages/Feed/Share/OnlyCreatorSetting";
import Refund from "./Components/OnlyCreatorPage/Refund";
import MyFandom from "./Components/OnlyCreatorPage/MyFandom";
import Income from "./Components/OnlyCreatorPage/Income";
import MessageSetting from "./Components/OnlyCreatorPage/MessageSetting";
import ChatAll from "./Pages/Feed/Share/ChatAll";
import MembershipPlanSetting from "./Components/OnlyCreatorPage/MembershipPlanSetting";
import UserJoin from "./Pages/LoginPage/UserJoin";
import AdminMain from "./Pages/Admin/AdminMain";
import RegisterList from "./Pages/Admin/RegisterList";
function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<MainIndex />} />
          <Route path="rating/daily" element={<DailyRating />} />
          <Route path="rating/weekly" element={<WeeklyRating />} />
          <Route path="rating/total" element={<TotalRating />} />
          <Route path="rating/search" element={<SearchInfluence />} />
          <Route path="cardpost" element={<CardPost />} />
        </Route>
        <Route path="/withus" element={<WithUs />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/join" element={<UserJoin />} />
        <Route path="/register-creator" element={<RegisterCreator />} />
        <Route path="/register-partner" element={<RegisterPartner />} />
        <Route
          path={`/${process.env.REACT_APP_ADMIN_DASHBOARD_PANEL}`}
          element={<AdminMain />}
        >
          <Route index element={null} />
          <Route path="register-list" element={<RegisterList />} />
        </Route>
        <Route path="/main" element={<FeedMain />}>
          <Route index element={<FeedHome />} />
          <Route path=":userId" element={<PersonalScreen />}>
            <Route index element={<CreatorFeed />} />
            <Route path="feed" element={<CreatorFeed />} />
            <Route path="requestion" element={<UserRequestion />} />
          </Route>
          <Route path="alarm" element={<Alarm />} />
          <Route path="chat" element={<Chat />} />
          <Route path="chat-all" element={<ChatAll />} />
          <Route path="membership" element={<Membership />} />
          <Route path="liked" element={<LikedFeed />} />
          <Route path="search" element={<Search />}>
            <Route index element={<FeedSearchTotal />} />
            <Route path="total" element={<FeedSearchTotal />} />
            <Route path="week" element={<FeedSearchWeek />} />
            <Route path="daily" element={<FeedSearchDay />} />
            <Route path="cardpost" element={<FeedSearchPost />} />
          </Route>
          <Route path="setting" element={<Setting />}>
            <Route index element={null} />
            <Route path="profile" element={<Profile />} />
            <Route path="account" element={<Account />} />
            <Route path="block" element={<BlockAccount />} />
            <Route path="apply-creator" element={<CreatorApply />} />
            <Route path="payment-methods" element={<PaymentMethod />} />
            <Route path="billing-history" element={<BillingHistory />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="creator-setting" element={<OnlyCreatorSetting />}>
            <Route index element={null} />
            <Route path="refunds" element={<Refund />} />
            <Route path="myfans" element={<MyFandom />} />
            <Route path="my-fandom" element={<MyFandom />} />
            <Route path="income" element={<Income />} />
            <Route path="message" element={<MessageSetting />} />
            <Route path="membership" element={<MembershipPlanSetting />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
