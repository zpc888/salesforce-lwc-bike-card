@RestResource(urlMapping='/zpc/v1/hello/*')
global with sharing class HelloWorld {
    // https://MyDomainName.my.salesforce.com/services/apexrest/CaseManagement/v1/500D0000003aCts
    // https://instance.       salesforce.com/services/apexrest/Account/
/*

curl -H "Authorization:Bearer 00D7g000000xRTu\!ARcAQBxZE1qP5jNXpmkBmvIEmT3A5IIl3v5LFQbUl7X6jtudHxsejCB8vm2VaZBMRQ14cn1Jb9EAZzgNyN0dbkS1KtP9fXkM" -H "Content-Type: application/json" -X POST -d @req.txt "https://fun-customer-8925-dev-ed.scratch.my.salesforce.com/services/apexrest/zpc/v1/hello/george"

curl -H "Authorization:Bearer 00D7g000000xRTu\!ARcAQBxZE1qP5jNXpmkBmvIEmT3A5IIl3v5LFQbUl7X6jtudHxsejCB8vm2VaZBMRQ14cn1Jb9EAZzgNyN0dbkS1KtP9fXkM" -H "Content-Type: application/json" -X POST -d '{"name": "zpc", "city": "Toronto", "province": "ON"}' "https://fun-customer-8925-dev-ed.scratch.my.salesforce.com/services/apexrest/zpc/v1/hello/george"

curl -X POST "https://fun-customer-8925-dev-ed.scratch.my.salesforce.com/services/oauth2/token?grant_type=client_credentials&client_id=3MVG9BJjUUIJZf1ymjHhSSTBPXwT9D13Ac3pa.A4NITiu.lHkzRY8GrtGyvNsy4HIRxb1rHQ9uQOAGSIE6NHX&client_secret=EAEB9677E630CDE20AE7F7C15B4321AA9DA508BDE21D3705580A1BC7932C83CC"

curl -w "\n\n" -H "Authorization:Bearer 00D7g000000xRTu\!ARcAQGBvDuoc_99gRxH.ZBWa2XTAJRtFg0PAVg86quZbu3zwC4IAtprehzZhLFagbhWW.2B33XXyil1pcWYUPADG.lcmkrsl" -H "Content-Type: application/json" -X POST -d '{"name": "zpc", "city": "Toronto", "province": "ON"}' "https://fun-customer-8925-dev-ed.scratch.my.salesforce.com/services/apexrest/zpc/v1/hello/george"

*/

    @HttpPost
    global static void HelloWorld() {
        RestRequest  req = RestContext.request;
        RestResponse res = RestContext.response;
        String uri = req.requestURI;
        String who = uri.substring(uri.lastIndexOf('/') + 1);
        String jsonString = req.requestBody.toString();
        System.debug('JSON String = ' + jsonString);

        Map<String, Object> reqJson = (Map<String, Object>)JSON.deserializeUntyped(jsonString);
        Map<String, Object> resJson = new Map<String, Object>();
        resJson.put('who', who);
        resJson.put('date', Date.today());
        resJson.put('requestJson', reqJson);

        res.statusCode = 200;
        res.responseBody = Blob.valueOf(JSON.serialize(resJson));
    }
}