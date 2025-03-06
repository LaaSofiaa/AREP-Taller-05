package com.edu.arep.tallerjpa.Repository;

import java.util.List;

import com.edu.arep.tallerjpa.Entity.Property;
import org.springframework.data.repository.CrudRepository;

public interface PropertyRepository extends CrudRepository<Property, Long> {
    List<Property> findByAddress(String address);
    Property findById(long id);
}
