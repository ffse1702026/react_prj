package com.example.demo.entity;

public class Student {
	
	private String name;
	private int id;
	private int age;
	private String company;
	
	public Student(String name, int id, int age, String company) {
		super();
		this.name = name;
		this.id = id;
		this.age = age;
		this.company = company;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public Student(String name, int id, int age) {
		super();
		this.name = name;
		this.id = id;
		this.age = age;
	}
	public Student() {
		super();
	}
	
	

}
