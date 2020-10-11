package com.example.demo.entity;

import java.util.List;

public class SkuPage {
	private List<Sku> sku;
	private Integer totalElement;
	private Integer size;
	private Integer page;
	private Integer totalPages;
	private String searchText;
	public List<Sku> getSku() {
		return sku;
	}
	public void setSku(List<Sku> sku) {
		this.sku = sku;
	}
	public Integer getTotalElement() {
		return totalElement;
	}
	public void setTotalElement(Integer totalElement) {
		this.totalElement = totalElement;
	}
	public Integer getSize() {
		return size;
	}
	public void setSize(Integer size) {
		this.size = size;
	}
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public SkuPage(List<Sku> sku, Integer totalElement, Integer size, Integer page) {
		super();
		this.sku = sku;
		this.totalElement = totalElement;
		this.size = size;
		this.page = page;
	}
	public Integer getTotalPages() {
		return totalPages;
	}
	public void setTotalPages(Integer totalPages) {
		this.totalPages = totalPages;
	}
	public SkuPage(List<Sku> sku, Integer totalElement, Integer size, Integer page, Integer totalPages) {
		super();
		this.sku = sku;
		this.totalElement = totalElement;
		this.size = size;
		this.page = page;
		this.totalPages = totalPages;
	}
	public String getSearchText() {
		return searchText;
	}
	public void setSearchText(String searchText) {
		this.searchText = searchText;
	}
	public SkuPage(List<Sku> sku, Integer totalElement, Integer size, Integer page, Integer totalPages,
			String searchText) {
		super();
		this.sku = sku;
		this.totalElement = totalElement;
		this.size = size;
		this.page = page;
		this.totalPages = totalPages;
		this.searchText = searchText;
	}
	
	
	
	
}
