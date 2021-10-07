package projectArme.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import projectArme.entities.Arme;

import java.util.UUID;

public interface ArmeRepository extends JpaRepository<Arme, UUID> {
    void deleteById(UUID id);
}
