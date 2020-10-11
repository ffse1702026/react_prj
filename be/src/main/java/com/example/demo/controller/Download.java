package com.example.demo.controller;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.io.FileUtils;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class Download {
  @RequestMapping("/")
  public String index() {
    return "index";
  }
  @RequestMapping(value = "/download1", method = RequestMethod.POST)
  public void download1(HttpServletResponse response) throws IOException {
    try {
      File file = ResourceUtils.getFile("classpath:file/demo.zip");
      byte[] data = FileUtils.readFileToByteArray(file);
      // Thiết lập thông tin trả về
      response.setContentType("application/octet-stream");
      response.setHeader("Content-disposition", "attachment; filename=" + file.getName());
      response.setContentLength(data.length);
      InputStream inputStream = new BufferedInputStream(new ByteArrayInputStream(data));
      FileCopyUtils.copy(inputStream, response.getOutputStream());
    } catch (Exception ex) {
      ex.printStackTrace();
    }
  }
  @RequestMapping(value = "/download2", method = RequestMethod.GET)
  public ResponseEntity<InputStreamResource> download2(HttpServletRequest request) throws IOException {
    HttpHeaders responseHeader = new HttpHeaders();
    try {
      File file = ResourceUtils.getFile("classpath:file/demo.txt");
      byte[] data = FileUtils.readFileToByteArray(file);
      // Set mimeType trả về
      responseHeader.setContentType(MediaType.APPLICATION_OCTET_STREAM);
      // Thiết lập thông tin trả về
      responseHeader.set("Content-disposition", "attachment; filename=" + file.getName());
      responseHeader.setContentLength(data.length);
      InputStream inputStream = new BufferedInputStream(new ByteArrayInputStream(data));
      InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
      return new ResponseEntity<InputStreamResource>(inputStreamResource, responseHeader, HttpStatus.OK);
    } catch (Exception ex) {
      return new ResponseEntity<InputStreamResource>(null, responseHeader, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @ResponseBody
  @RequestMapping(value = "/devices", method = RequestMethod.GET)
  public String divices(HttpServletRequest request) throws IOException {
    HttpHeaders responseHeader = new HttpHeaders();
    return "{\r\n" + 
    		"   \"content\":[\r\n" + 
    		"      {\r\n" + 
    		"         \"id\":null,\r\n" + 
    		"         \"serialNo\":\"CHROME_B88A60D6E16F\",\r\n" + 
    		"         \"agentId\":\"CHROME_B88A60D6E16F\",\r\n" + 
    		"         \"osName\":\"Windows\",\r\n" + 
    		"         \"osVersionText\":\"Windows 10 64bit\",\r\n" + 
    		"         \"osVersionNumber\":\"10.0\",\r\n" + 
    		"         \"brand\":\"Windows 10\",\r\n" + 
    		"         \"model\":\"Chrome 85.0.4183.83\",\r\n" + 
    		"         \"macAddress\":\"B88A60D6E16F\",\r\n" + 
    		"         \"ipAddress\":\"192.168.1.4\",\r\n" + 
    		"         \"sessionId\":\"e04ea5167e0e44e9a3a216a2e872f31c\",\r\n" + 
    		"         \"status\":\"IDLE\",\r\n" + 
    		"         \"additionalInfo\":null,\r\n" + 
    		"         \"startTime\":null,\r\n" + 
    		"         \"endTime\":null,\r\n" + 
    		"         \"lastUpdated\":\"2020-09-08\",\r\n" + 
    		"         \"usbPlugged\":false,\r\n" + 
    		"         \"removed\":false,\r\n" + 
    		"         \"displayName\":\"192.168.1.4 / Windows 10 / Chrome 85.0.4183.83 / CHROME_B88A60D6E16F\",\r\n" + 
    		"         \"displayStatus\":null,\r\n" + 
    		"         \"recordOnWindow\":true,\r\n" + 
    		"         \"recordOnMacOsx\":false,\r\n" + 
    		"         \"uuid\":null,\r\n" + 
    		"         \"builtinAgent\":false,\r\n" + 
    		"         \"name\":null\r\n" + 
    		"      },\r\n" + 
    		"	  {\r\n" + 
    		"         \"id\":null,\r\n" + 
    		"         \"serialNo\":\"1111\",\r\n" + 
    		"         \"agentId\":\"22222222222\",\r\n" + 
    		"         \"osName\":\"Windows\",\r\n" + 
    		"         \"osVersionText\":\"Windows 10 64bit\",\r\n" + 
    		"         \"osVersionNumber\":\"10.0\",\r\n" + 
    		"         \"brand\":\"Windows 10\",\r\n" + 
    		"         \"model\":\"Chrome 85.0.4183.83\",\r\n" + 
    		"         \"macAddress\":\"B88A60D6E16F\",\r\n" + 
    		"         \"ipAddress\":\"192.168.1.4\",\r\n" + 
    		"         \"sessionId\":\"e04ea5167e0e44e9a3a216a2e872f31c\",\r\n" + 
    		"         \"status\":\"IDLE\",\r\n" + 
    		"         \"additionalInfo\":null,\r\n" + 
    		"         \"startTime\":null,\r\n" + 
    		"         \"endTime\":null,\r\n" + 
    		"         \"lastUpdated\":\"2020-09-08\",\r\n" + 
    		"         \"usbPlugged\":false,\r\n" + 
    		"         \"removed\":false,\r\n" + 
    		"         \"displayName\":\"192.168.1.4 / Windows 10 / Chrome 85.0.4183.83 / CHROME_B88A60D6E16F\",\r\n" + 
    		"         \"displayStatus\":null,\r\n" + 
    		"         \"recordOnWindow\":true,\r\n" + 
    		"         \"recordOnMacOsx\":false,\r\n" + 
    		"         \"uuid\":null,\r\n" + 
    		"         \"builtinAgent\":false,\r\n" + 
    		"         \"name\":null\r\n" + 
    		"      }\r\n" + 
    		"   ],\r\n" + 
    		"   \"totalPages\":1,\r\n" + 
    		"   \"totalElements\":1,\r\n" + 
    		"   \"last\":true,\r\n" + 
    		"   \"first\":true,\r\n" + 
    		"   \"sort\":{\r\n" + 
    		"      \"sorted\":false,\r\n" + 
    		"      \"unsorted\":true,\r\n" + 
    		"      \"empty\":true\r\n" + 
    		"   },\r\n" + 
    		"   \"number\":0,\r\n" + 
    		"   \"numberOfElements\":2,\r\n" + 
    		"   \"size\":10,\r\n" + 
    		"   \"empty\":false\r\n" + 
    		"}";
    
  }
  
}