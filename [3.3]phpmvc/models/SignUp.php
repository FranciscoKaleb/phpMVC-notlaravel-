<?php

class SignUp
{
    
    public function getRegion($conn){
        
        try {
            $selectQuery = "SELECT regDesc FROM refregion";
            $stmt = $conn->prepare($selectQuery);
            $stmt->execute(); 
            

            $regDesc = '';
            $stmt->bind_result($regDesc); 
            $results = array();
            
            
            while ($stmt->fetch()) { 
                $results[] = $regDesc;
            }
            $stmt->close();
            return $results;
        } 
        
        catch (Exception $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    public function getProvince($conn, $formData){
        try {
            $selectQuery = "SELECT provDesc, provCode FROM refprovince WHERE 
            regCode = (SELECT regCode FROM refregion WHERE regDesc = ?)";
            
            $provDesc = '';
            $provCode = '';

            $stmt = $conn->prepare($selectQuery);
            $stmt->bind_param("s", $formData);
            $stmt->execute();
            $stmt->bind_result($provDesc, $provCode);
            $results = array();
    
            while ($stmt->fetch()) {
                $resultItem = array(
                    "provDesc" => $provDesc,
                    "provCode"=> $provCode
                );
                $results[] = $resultItem;
            }
            //header("Content-Type: application/json");
            //echo json_encode($results);
            
            $stmt->close();

            return $results;
    
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    public function getCity($conn, $formData){
        try {
            $selectQuery = "SELECT citymunDesc, citymunCode FROM refcitymun WHERE 
            provCode = ?"; 
            
            
            $stmt = $conn->prepare($selectQuery);
            $stmt->bind_param("s", $formData); 
            $stmt->execute(); 
    
    
            $citymunCode = '';
            $citymunDesc = '';

            $stmt->bind_result($citymunDesc, $citymunCode); 
            $results = array(); 
    
            while ($stmt->fetch()) {
                $resultItem = array(
                    "citymunDesc" => $citymunDesc,
                    "citymunCode"=> $citymunCode
                );
                $results[] = $resultItem;
            }
            
            $stmt->close();
            
            return $results;
    
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
        }
    }
    public function getBrgy($conn, $formData){
        try {
            $checkQuery = "SELECT brgyDesc, brgyCode FROM refbrgy WHERE 
            citymunCode = ?";
            
            $brgyCode = '';
            $brgyDesc = '';
            
            $stmt = $conn->prepare($checkQuery);
            $stmt->bind_param("s", $formData);
            $stmt->execute();
            $stmt->bind_result($brgyDesc, $brgyCode);
            $results = array();
    
            while ($stmt->fetch()) {
                $resultItem = array(
                    "brgyDesc" => $brgyDesc,
                    "brgyCode"=> $brgyCode
                );
                $results[] = $resultItem;
            }
            
            $stmt->close();
            return $results;
    
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
        }
    }
}
?>