package com.example.demo.entity;

public class Sku {
	
	private Integer id;
	private String name;
	private String status;
	private String description;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Sku(Integer id, String name, String status, String description) {
		super();
		this.id = id;
		this.name = name;
		this.status = status;
		this.description = description;
	}
	public Sku() {
		super();
	}
	

}
