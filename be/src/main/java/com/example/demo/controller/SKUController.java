package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.entity.Sku;
import com.example.demo.entity.SkuPage;

@Controller
@CrossOrigin
public class SKUController {
	
	@GetMapping(value = "/skus")
	@ResponseBody
	private SkuPage getAllSku(@RequestParam(name = "page") Integer page, @RequestParam(name= "searchText", defaultValue = "") String searchText) {
		
		List<Sku> skus= new ArrayList<>(); 
		skus.add(new Sku(1, "sang", "done", "Description"));
		skus.add(new Sku(2, "sang", "done", "Description"));
		skus.add(new Sku(3, "sang", "done", "Description"));
		skus.add(new Sku(4, "sang", "done", "Description"));
		SkuPage skuPage = new SkuPage(skus, 3, 10, 1, 1, "");
		return skuPage;
	}
	
	@DeleteMapping(value = "/skus/{id}")
	@ResponseBody
	private SkuPage deleteSku(@PathVariable("id") Integer id) {
		
		List<Sku> skus= new ArrayList<>(); 
		skus.add(new Sku(1, "sang", "done", "Description"));
		skus.add(new Sku(2, "sang", "done", "Description"));
		SkuPage skuPage = new SkuPage(skus, 3, 10, 1, 1, "");
		return skuPage;
	}

}
