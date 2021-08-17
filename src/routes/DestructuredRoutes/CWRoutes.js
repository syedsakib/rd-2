import React, { useState, useEffect, Fragment } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import Dashboard from "pages/Dashboard/index";

import ArticleList from "pages/ContentWriterModule/Blog/Contents/ArticleList";
import TagList from "pages/ContentWriterModule/Blog/Tags/TagList";
import WriterList from "pages/ContentWriterModule/Writer/WriterList";
import AddWriter from "pages/ContentWriterModule/Writer/AddWriter";
import EditWriter from "pages/ContentWriterModule/Writer/EditWriter";
import CmsList from "pages/ContentWriterModule/CMS/MetaCMS/CmsList";
import EditMetaCms from "pages/ContentWriterModule/CMS/MetaCMS/EditMetaCms";
import InvalidPropertyList from "pages/ContentWriterModule/ScrapeLoader/InvalidProperty/PropertyList";
import ScrapeInvalidPropertyEditor from "pages/ContentWriterModule/ScrapeLoader/InvalidProperty/PropertyEditor/PropertyEditWrapper";
import ProcessList from "pages/ContentWriterModule/ScrapeLoader/Process/ProcessList";
import ProcessDataList from "pages/ContentWriterModule/ScrapeLoader/Process/ProcessDataList";
import PropertyList from "pages/ContentWriterModule/ScrapeLoader/Property/PropertyList";
import UpdateHistoryList from "pages/ContentWriterModule/ScrapeLoader/Property/UpdateHistoryList";
import PropertyEditWrapper from "pages/ContentWriterModule/ScrapeLoader/Property/PropertyEditor/PropertyEditWrapper";
import CommentsList from "pages/ContentWriterModule/Blog/Comments/CommentsList";
import CMSPage from "pages/ContentWriterModule/CMS/StructureCMS/CMSPage";
import AddStructureCMSPage from "pages/ContentWriterModule/CMS/StructureCMS/AddStructureCMSPage";
import AddArticle from "pages/ContentWriterModule/Blog/Contents/AddArticle";
import EditArticle from "pages/ContentWriterModule/Blog/Contents/EditArticle";
import NewsPortal from "pages/ContentWriterModule/Blog/Contents/NewsPortal";
import EmailTemplateList from "pages/ContentWriterModule/Template/TemplateList";
import AddEmailTemplate from "pages/ContentWriterModule/Template/AddTemplate";
import EditEmailTemplate from "pages/ContentWriterModule/Template/EditTemplate";

// layouts Format
import VerticalLayout from "components/VerticalLayout";
import HorizontalLayout from "components/HorizontalLayout";

const CWRoutes = ({ userDetails, appSize, layout }) => {
  function getLayout() {
    let layoutCls = VerticalLayout;
    switch (layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  }

  const Layout = getLayout();
  return (
    <div>
      <Layout>
        <Route
          exact
          path="/cw"
          name="Blog Blog"
          render={(props) => <ArticleList {...props} />}
        />
        <Route
          exact
          path="/cw/blog"
          name="Blog Blog"
          render={(props) => <ArticleList {...props} />}
        />
        <Route
          exact
          path="/cw/blog/create"
          name="Blog Blog"
          render={(props) => <AddArticle {...props} />}
        />
        <Route
          exact
          path="/cw/blog/tags"
          name="Blog Blog"
          render={(props) => <TagList {...props} />}
        />
        <Route
          exact
          path="/cw/writer"
          name="Blog Blog"
          render={(props) => <WriterList {...props} />}
        />
        <Route
          exact
          path="/cw/writer/create"
          name="Blog Blog"
          render={(props) => <AddWriter {...props} />}
        />
        <Route
          exact
          path="/cw/writer/edit/:id"
          name="Blog Blog"
          render={(props) => <EditWriter {...props} />}
        />
        <Route
          exact
          path="/cw/cms/meta"
          name="Blog Blog"
          render={(props) => <CmsList {...props} />}
        />
        <Route
          exact
          path="/cw/cms/meta/edit/:id"
          name="Blog Blog"
          render={(props) => <EditMetaCms {...props} />}
        />
        <Route
          exact
          path="/cw/cms/structure"
          name="Blog Blog"
          render={(props) => <CMSPage {...props} />}
        />
        <Route
          exact
          path="/cw/cms/structure/create"
          name="Blog Blog"
          render={(props) => <AddStructureCMSPage {...props} />}
        />
        <Route
          exact
          path="/cw/scrape/invalid-list"
          name="Blog Blog"
          render={(props) => <InvalidPropertyList {...props} />}
        />
        <Route
          exact
          path="/cw/scrape/invalidProperty/edit/:id"
          name="Blog Blog"
          render={(props) => <ScrapeInvalidPropertyEditor {...props} />}
        />
        <Route
          exact
          path="/cw/scrape/process"
          name="Blog Blog"
          render={(props) => <ProcessList {...props} />}
        />
        <Route
          exact
          path="/cw/scrape/process/dataList/:id"
          name="Blog Blog"
          render={(props) => <ProcessDataList {...props} />}
        />
        <Route
          exact
          path="/cw/scrape"
          name="Blog Blog"
          render={(props) => <PropertyList {...props} />}
        />
        <Route
          exact
          path="/cw/scrape/property/edit/:ID"
          name="Blog Blog"
          render={(props) => <PropertyEditWrapper {...props} />}
        />
        <Route
          exact
          path="/cw/scrape/property/history/:id"
          name="Blog Blog"
          render={(props) => <UpdateHistoryList {...props} />}
        />
        <Route
          exact
          path="/cw/blog/comments"
          name="Blog Blog"
          render={(props) => <CommentsList {...props} />}
        />
        <Route
          exact
          path="/cw/blog/edit/:id"
          name="Blog Blog"
          render={(props) => <EditArticle {...props} />}
        />
        <Route
          exact
          path="/cw/blog/news"
          name="Blog Blog"
          render={(props) => <NewsPortal {...props} />}
        />
        <Route
          exact
          path="/cw/templates/email"
          name="Blog Blog"
          render={(props) => <EmailTemplateList {...props} />}
        />
        <Route
          exact
          path="/cw/template/email/create"
          name="Blog Blog"
          render={(props) => <AddEmailTemplate {...props} />}
        />
        <Route
          exact
          path="/cw/templates/email/:id"
          name="Blog Blog"
          render={(props) => <EditEmailTemplate {...props} />}
        />
        <Route
          exact
          path="/"
          name="Blog Blog"
          render={(props) => <Dashboard {...props} />}
        />
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails.loggedInUser,
  appSize: state.global.appSize,
  notiDetail: state.notification.notiDetail,
  layout: state.Layout,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CWRoutes);
