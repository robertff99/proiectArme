package projectArme.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import projectArme.entities.Utilizator;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UtilizatorRepository extends JpaRepository<Utilizator, UUID> {


    List<Utilizator> findByUsername(String name);


    @Transactional
    Optional<Utilizator> findByUsernameAndPassword(String username, String password);



}
