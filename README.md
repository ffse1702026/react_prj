# react_prj


#	Items	PIC
1	Setup Env.	 
1.1	React Js	N/A
1.2	Go	N/A
1.3	PostgresSQL 12	N/A
1.4	Bootstrap Integration	Trung Phan
	 	
2	Login, Logout	
2.1	[FE] Login, Logout	Tuan Anh
2.2	[BE] Login, Logout	Hung Hoang
2.3	[DB] User/Role/UserRole 	
 	 	
3	SKU Page	
3.1	[FE] Listing/Delete	Sang Nguyen
3.2	[FE] Create/Edit	Trung Phan
3.3	[BE] Listing/Create/Edit/Delete	Hung Hoang
3.4	[DB] SKU	
 	 	
3	Product Page	
3.1	[FE] Listing/Delete	Trung Phan
3.2	[FE] Create/Edit	Tuan Anh
3.3	[BE] Listing/Create/Edit/Delete	Hung Hoang
3.4	[DB] Product, Product_SKU	


{
  "name": "navi-web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "test:e2e": "vue-cli-service test:e2e"
  },
  "dependencies": {
    "axios": "^0.19.0",
    "core-js": "^2.6.5",
    "jointjs": "^3.1.1",
    "moment": "2.24.0",
    "moment-timezone": "0.5.27",
    "smoothscroll-polyfill": "^0.4.4",
    "vue": "^2.6.10",
    "vue-i18n": "^8.14.0",
    "vue-router": "^3.1.2"
  },
  "devDependencies": {
    "@fortawesome/fontawesome-free": "^5.9.0",
    "@vue/cli-plugin-babel": "^3.8.0",
    "@vue/cli-plugin-e2e-nightwatch": "^3.8.0",
    "@vue/cli-service": "^3.8.0",
    "vue-template-compiler": "^2.6.10"
  }
}
<script> " //
            + "SELECT DISTINCT " //
            + "  \"SEIBUN_CD\", " //
            + "  \"SEIBUN_NM\", " //
            + "  \"SIKIBETU\" " //
            + "FROM " //
            + "  TEC_M_SEIBUN " //
            + "WHERE " //
            + "  \"SIKIBETU\" IN " //
            + "  <foreach item='sikibetu' collection='sikibetuList' " //
            + "   open='(' separator=',' close=')'>" //
            + "    #{sikibetu} " //
            + "  </foreach> " //
            + "ORDER BY " //
            + "  \"SEIBUN_CD\" ASC " //
            + "</script> 
	    
	    
	    super.issueMapper.truncate();

		/// Test Data ///
		final String insertedRequestBody = "{" //
				+ "\"naviFlow\":\"insertedFlow\"," //
				+ "\"naviAttributes\":\"insertedAttributes\"," //
				+ "\"naviProperties\":\"insertedProperties\"" //
				+ "}";
		final String updatedRequestBody = "{" //
				+ "\"naviFlow\":\"updatedFlow\"," //
				+ "\"naviAttributes\":\"updatedAttributes\"," //
				+ "\"naviProperties\":\"updatedProperties\"" //
				+ "}";

		/// Assertion ///

		// 1. The test to insert at first time
		given() //
				.contentType("application/json;charset=UTF-8") //
				.body(insertedRequestBody) //
				.queryParam("category-id", "1") //
				.queryParam("level1-code", "B00") //
				.queryParam("level2-code", "G01") //
				.queryParam("level3-code", "V10") //
				.queryParam("level4-code", "") //
				.queryParam("level5-code", "") //
				.queryParam("level1-member-code", "") //
				.queryParam("level2-member-code", "10D") //
				.queryParam("level3-member-code", "") //
				.queryParam("level4-member-code", "") //
				.queryParam("level5-member-code", "") //
				.queryParam("location-cd", "B001") //
				.queryParam("incident-cd", "H001") //
				.queryParam("support-id", "K001") //
				.queryParam("release-locales", "ja,en") //
				.queryParam("work-user", "USER00") //
				.queryParam("current-node-id", "NODE000_CURRENT") //
				// "current-work-time" must not be set
				.queryParam("last-node-id", "NODE000_CURRENT") //
				.when() //
				.post("/api/navi/issue") //
				.then() //
				.statusCode(200) //
		;

		final List<Issue> insertedIssues = issueMapper.select(1, "B00", "G01", "V10", "", "", "", "10D", "", "", "",
				"B001", "H001", "K001");
		assertThat(insertedIssues.size(), is(1));
		final Issue insertedIssue = insertedIssues.get(0);
		assertThat(insertedIssue.getCategoryId(), is(1));
		assertThat(insertedIssue.getLevel1Code(), is("B00"));
		assertThat(insertedIssue.getLevel2Code(), is("G01"));
		assertThat(insertedIssue.getLevel3Code(), is("V10"));
		assertThat(insertedIssue.getLevel4Code(), is(""));
		assertThat(insertedIssue.getLevel5Code(), is(""));
		assertThat(insertedIssue.getLevel1MemberCode(), is(""));
		assertThat(insertedIssue.getLevel2MemberCode(), is("10D"));
		assertThat(insertedIssue.getLevel3MemberCode(), is(""));
		assertThat(insertedIssue.getLevel4MemberCode(), is(""));
		assertThat(insertedIssue.getLevel5MemberCode(), is(""));
		assertThat(insertedIssue.getLocationCd(), is("B001"));
		assertThat(insertedIssue.getIncidentCd(), is("H001"));
		assertThat(insertedIssue.getSupportId(), is("K001"));
		assertThat(insertedIssue.getReleaseLocales(), is("ja,en"));
		assertThat(insertedIssue.getWorkUser(), is("USER00"));
		assertThat(insertedIssue.getWorkTime(), is(notNullValue()));
		assertThat(insertedIssue.getNaviFlow(), is("insertedFlow"));
		assertThat(insertedIssue.getCurrentNodeId(), is("NODE000_CURRENT"));
		assertThat(insertedIssue.getCurrentWorkTime(), is(nullValue()));
		assertThat(insertedIssue.getLastNodeId(), is("NODE000_CURRENT"));
		assertThat(insertedIssue.getNaviAttributes(), is("insertedAttributes"));
		assertThat(insertedIssue.getNaviProperties(), is("insertedProperties"));
		assertThat(insertedIssue.getFirstWrite(), is(notNullValue()));
		assertThat(insertedIssue.getUpDate(), is(nullValue()));
		assertThat(insertedIssue.getDelFlg(), is("0"));


given() //
				.multiPart(new MultiPartSpecBuilder(new File(uploadFilePath))
						.fileName("error_unsupported_navi_upload_file.csv").controlName("file").build())
