package projectArme.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import projectArme.entities.Admin;

import java.util.List;
import java.util.UUID;

public interface AdminRepository extends JpaRepository<Admin, UUID> {


    List<Admin> findByName(String name);
    @Transactional
    void deleteById(UUID id);

//    @Transactional
//    void findByAge(int age);



}
