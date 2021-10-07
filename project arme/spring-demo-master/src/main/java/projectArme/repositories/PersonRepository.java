package projectArme.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import projectArme.entities.Person;

import java.util.List;
import java.util.UUID;

public interface PersonRepository extends JpaRepository<Person, UUID> {
    void deleteById(UUID id);

    List<Person> findByName(String name);


//    @Transactional
//    void findByAge(int age);



}
