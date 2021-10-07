package projectArme.dtos.builders;

import projectArme.dtos.UtilizatorDetailsDTO;
import projectArme.entities.Utilizator;
import projectArme.dtos.UtilizatorDTO;


public class UtilizatorBuilder {

    private UtilizatorBuilder() {
    }

    public static UtilizatorDTO toUtilizatorDTO(Utilizator utilizator) {
        return new UtilizatorDTO(utilizator.getId(), utilizator.getUsername(), utilizator.getPassword(),utilizator.getRole());
    }

    public static UtilizatorDetailsDTO toUtilizatorDetailsDTO(Utilizator utilizator) {
        System.out.println(utilizator.getRole());
        return new UtilizatorDetailsDTO(utilizator.getId(), utilizator.getUsername(), utilizator.getPassword(), utilizator.getRole());
    }

    public static Utilizator toEntity(UtilizatorDetailsDTO utilizatorDetailsDTO) {
        return new Utilizator(utilizatorDetailsDTO.getUsername(),
                utilizatorDetailsDTO.getPassword(),
                utilizatorDetailsDTO.getRole());
    }
}
