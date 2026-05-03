package com.my.tiffin.service;

import com.my.tiffin.model.Menu;
import java.util.List;

public interface MenuService {
    Menu addMenu(Menu menu);
    List<Menu> getAllMenus();
}