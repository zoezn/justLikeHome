package com.example.BookingProject;

import com.example.BookingProject.bookingAPI.persistence.model.Category;
import com.example.BookingProject.bookingAPI.service.CategoryServiceImpl;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class CategoryControllerTest {

	@Autowired
	CategoryServiceImpl categoryServiceimpl;

	@Order(1)
	@Test
	void testSaveCategory() {
		Category c = new Category(1l,"Casa", "Casa", "URL");
		try {
			categoryServiceimpl.saveCategory(c);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		assertNotNull(categoryServiceimpl.getCategoryByTitle("Casa"));
	}

/*	@Test
	void testSaveCategories() {
		List<Category> categories = new ArrayList<>();
		categories.add(new Category(2l,"","",""));
		categories.add(new Category(3l,"","",""));
		categoryServiceimpl.saveCategories(categories);

		assertTrue(categoryServiceimpl.getAllCategories().size() > 0);
	}*/

	@Order(2)
	@Test
	void testGetCategoryByTitle() {
		Category c = new Category(2l, "Casa2", "", "");
		try {
			categoryServiceimpl.saveCategory(c);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		assertTrue(categoryServiceimpl.getCategoryByTitle("Casa2") != null);
	}

	@Order(3)
	@Test
	void testGetAllCategories() {
		List<Category> listOfCategories = categoryServiceimpl.getAllCategories();
		Category c1= new Category();
		Category c2 = new Category();
		listOfCategories.add(c1);
		listOfCategories.add(c2);

		assertTrue(categoryServiceimpl.getAllCategories() != null);
	}

	@Order(4)
	@Test
	void testUpdateCategory() {
		Category cUpdated = categoryServiceimpl.getCategoryByTitle("Casa");
		cUpdated.setImageURL("URL");
		categoryServiceimpl.updateCategory(cUpdated);
		assertTrue(categoryServiceimpl.getCategoryByTitle("Casa").getImageURL() == "URL");
	}

	@Order(5)
	@Test
	void testDeleteCategory() {
		try {
			categoryServiceimpl.deleteCategory(1l);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		assertNull(categoryServiceimpl.getCategoryByTitle("Casa"));
	}
}
